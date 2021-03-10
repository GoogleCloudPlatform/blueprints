package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"path/filepath"

	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/klog/v2"
)

func main() {
	err := run(context.Background())
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}
}

func run(ctx context.Context) error {
	r := Runner{}

	flagSet := flag.NewFlagSet(os.Args[0], flag.ExitOnError)

	flagSet.StringVar(&r.Context, "context", r.Context, "directory to read KRM resources from (default: '.''")
	flagSet.StringVar(&r.WorkDir, "workdir", r.WorkDir, "directory to write KRM resources to (default: '.'")
	flagSet.StringVar(&r.PkgPath, "pkgpath", r.PkgPath, "URI of the git repo and directory that contains the kpt packages")
	flagSet.BoolVar(&r.Update, "update", r.Update, "update local kpt packages, if they already exist")

	// support klog flags (ex: -skip_headers)
	klog.InitFlags(flagSet)

	err := flagSet.Parse(os.Args[1:])
	if err != nil {
		return fmt.Errorf("failed to parse options: %w", err)
	}

	flagList := flagSet.Args()
	if len(flagList) != 0 {
		return fmt.Errorf("expected 0 args, but found %d", len(flagList))
	}

	if r.Context == "" {
		// default
		workdir, err := os.Getwd()
		if err != nil {
			return fmt.Errorf("implicit input directory not found: %w", err)
		}
		r.Context = workdir
	} else {
		// validate
		if _, err := os.Stat(r.Context); os.IsNotExist(err) {
			return fmt.Errorf("specified input directory (%q) not found: %w", r.Context, err)
		}
	}
	klog.Infof("Context: %s", r.Context)

	if r.WorkDir == "" {
		// default
		workdir, err := os.Getwd()
		if err != nil {
			return fmt.Errorf("implicit output directory not found: %w", err)
		}
		r.WorkDir = workdir
	} else {
		// validate
		if _, err := os.Stat(r.WorkDir); os.IsNotExist(err) {
			return fmt.Errorf("specified output directory (%q) not found: %w", r.WorkDir, err)
		}
	}
	klog.Infof("WorkDir: %s", r.WorkDir)

	if r.PkgPath == "" {
		return fmt.Errorf("pkgpath not specified")
	}
	klog.Infof("PkgPath: %s", r.PkgPath)

	err = seedRand()
	if err != nil {
		return err
	}

	contextResources, err := loadAllObjects(r.Context)
	if err != nil {
		return err
	}
	// for _, o := range contextResources {
	// 	klog.Infof("%s %s/%s", o.GetKind(), o.GetNamespace(), o.GetName())
	// }

	workdirResources, err := loadAllObjects(r.WorkDir)
	if err != nil {
		return err
	}

	var environs map[string]Environ
	var clustersByEnviron map[string][]Cluster
	var tenants map[string]Tenant

	// Lookup Environs
	if len(environs) == 0 {
		environs = make(map[string]Environ)
		for _, o := range contextResources {
			if o.GroupVersionKind().Group == "cft.dev" && o.GetKind() == "Environ" {
				var environ Environ
				unstructured := o.UnstructuredContent()
				//klog.Infof("Environ: %v", unstructured)
				err = runtime.DefaultUnstructuredConverter.FromUnstructured(unstructured, &environ)
				if err != nil {
					return fmt.Errorf("unable to get parse Environ resource: %w", err)
				}

				// TODO: Filter on EnvironSet Label or Annotation
				if _, exists := environs[environ.ObjectMeta.Name]; exists {
					return fmt.Errorf("duplicate Environ resource: %q", environ.ObjectMeta.Name)
				}
				environs[environ.ObjectMeta.Name] = environ
				klog.Infof("found environ: %q", environ.ObjectMeta.Name)
			}
		}
	}
	//klog.Infof("environs: %v", environs)

	// Lookup Clusters
	clustersByEnviron = make(map[string][]Cluster)
	for _, o := range contextResources {
		if o.GroupVersionKind().Group == "container.cnrm.cloud.google.com" && o.GetKind() == "ContainerCluster" {
			var cluster Cluster
			unstructured := o.UnstructuredContent()
			//klog.Infof("Cluster: %v", unstructured)
			err = runtime.DefaultUnstructuredConverter.FromUnstructured(unstructured, &cluster)
			if err != nil {
				return fmt.Errorf("unable to get parse Cluster resource: %w", err)
			}

			environ := cluster.Labels["gke.io/environ"]
			if environ == "" {
				return fmt.Errorf("Cluster resource %q does not have a 'gke.io/environ' label", cluster.Name)
			}

			clustersByEnviron[environ] = append(clustersByEnviron[environ], cluster)
			klog.Infof("found cluster: %q", cluster.Name)
		}
	}
	//log.Infof("clusters: %v", clustersByEnviron)

	// Lookup Tenants
	tenants = make(map[string]Tenant)
	for _, o := range workdirResources {
		if o.GroupVersionKind().Group == "cft.dev" && o.GetKind() == "Tenant" {
			var tenant Tenant
			unstructured := o.UnstructuredContent()
			//klog.Infof("Tenant: %v", unstructured)
			err = runtime.DefaultUnstructuredConverter.FromUnstructured(unstructured, &tenant)
			if err != nil {
				return fmt.Errorf("unable to get parse Tenant resource: %w", err)
			}

			// TODO: Filter on Environ Label or Annotation
			if _, exists := tenants[tenant.Name]; exists {
				return fmt.Errorf("duplicate Tenant resource: %q", tenant.Name)
			}
			tenants[tenant.Name] = tenant
			klog.Infof("found tenant: %q", tenant.Name)
		}
	}
	if len(tenants) != 1 {
		return fmt.Errorf("workdir must contain only one Tenant resource, found %d", len(tenants))
	}
	//klog.Infof("tenants: %v", tenants)

	// if not a git repo, init a temp one to allow kpt get & update
	gitDir := filepath.Join(r.WorkDir, ".git")
	if _, err := os.Stat(gitDir); os.IsNotExist(err) {

		// delete the .git dir after
		defer func() {
			if _, err := os.Stat(gitDir); !os.IsNotExist(err) {
				klog.Infof("rm -rf %q", gitDir)
				err := os.RemoveAll(gitDir)
				if err != nil {
					klog.Errorf("error deleting temporary git directory %s: %w", gitDir, err)
				}
			}
		}()

		err := gitInitAndCommit(ctx, r.WorkDir)
		if err != nil {
			return fmt.Errorf("error initializing temporary git directory %s: %w", gitDir, err)
		}
	}

	for tenantName, tenant := range tenants {
		// Populate tenantEnvirons with environs specified in the tenant.yaml.
		tenantEnvirons := make(map[string]Environ)
		for _, resourceRef := range tenant.Spec.EnvironRefs {
			environName := resourceRef.Name
			environ, found := environs[environName]
			if !found {
				return fmt.Errorf("environ %q not found, specified by tenant %q", environName, tenantName)
			}
			tenantEnvirons[environName] = environ
		}
		// If none are configured, add all known environs.
		if len(tenant.Spec.EnvironRefs) == 0 {
			for environName, environ := range environs {
				tenantEnvirons[environName] = environ
			}
		}

		// configure packages for each environ
		for environName, environ := range tenantEnvirons {
			if err := r.doTenantProject(ctx, tenant, environ); err != nil {
				return err
			}

			if err := r.doTenantProjectContents(ctx, tenant, environ); err != nil {
				return err
			}

			if err := r.doTenantImageRepo(ctx, tenant, environ); err != nil {
				return err
			}

			// configure packages for each cluster in this environ
			clusters := clustersByEnviron[environName]
			for _, cluster := range clusters {
				if err := r.doTenantNamespace(ctx, tenant, cluster, environs[environName]); err != nil {
					return err
				}
			}
		}
	}

	return nil
}

type Runner struct {
	Context, WorkDir, PkgPath string
	Update                    bool
}

// tenantProjectID looks up the value of the "project-id" setter from the "project" package.
// If not set, a new ID is generated using the tenant name, environ name, and a random suffix.
func (r *Runner) tenantProjectID(ctx context.Context, tenant Tenant, environ Environ) (string, error) {
	tenantName := tenant.ObjectMeta.Name
	environName := environ.ObjectMeta.Name
	pkgDir := filepath.Join(r.WorkDir, "environs", environName, "project")

	// Generate project-id (with new random suffix) only if not already set
	if exists, err := kptPackageExists(ctx, pkgDir); err != nil {
		return "", err
	} else if exists {
		// read project-id from project package Kptfile
		tenantProjectID, err := kptCfgGet(ctx, pkgDir, "project-id")
		if _, ok := err.(*SetterNotSetError); ok {
			// isSet != true, continue and generate
		} else if err != nil {
			// invalid kptfile
			return "", err
		} else {
			// isSet == true
			return tenantProjectID, nil
		}
	}

	// generate project-id with random suffix
	return fmt.Sprintf("%s-%s-%s", tenantName, environName, suffix()), nil
}

func (r *Runner) doTenantProject(ctx context.Context, tenant Tenant, environ Environ) error {
	tenantName := tenant.ObjectMeta.Name
	environName := environ.ObjectMeta.Name
	klog.Infof("configuring project for tenant %q in environ %q", tenantName, environName)
	destDir := filepath.Join(r.WorkDir, "environs", environName, "project")

	tenantProjectID, err := r.tenantProjectID(ctx, tenant, environ)
	if err != nil {
		return err
	}

	setters := map[string]string{
		"billing-account-id": environ.Spec.BillingAccountID,
		// folder-name (unknowable, team & environ specific, must be set by user)
		// folder-namespace (use default)
		"project-id": tenantProjectID, // probably overridden later by user to add context about parent folder
		// projects-namespace (use default)
		"management-project-id": environ.Spec.AdminProjectRef.Name,
		// management-namespace (use default)
	}

	pkgURI := fmt.Sprintf("%s/project", r.PkgPath)
	if err := kptGetAndSet(ctx, pkgURI, destDir, setters, r.Update); err != nil {
		return err
	}

	return nil
}

func (r *Runner) doTenantProjectContents(ctx context.Context, tenant Tenant, environ Environ) error {
	tenantName := tenant.ObjectMeta.Name
	environName := environ.ObjectMeta.Name
	klog.Infof("configuring project-contents for tenant %q in environ %q", tenantName, environName)
	destDir := filepath.Join(r.WorkDir, "environs", environName, "project-contents")

	tenantProjectID, err := r.tenantProjectID(ctx, tenant, environ)
	if err != nil {
		return err
	}

	setters := map[string]string{
		"tenant-project-id":  tenantProjectID, // probably overridden later by user to add context about parent folder
		"admin-project-id":   environ.Spec.AdminProjectRef.Name,
		"network-project-id": environ.Spec.NetworkProjectRef.Name,
		// tenant-admin-group (inherited from Tenant package)
	}

	pkgURI := fmt.Sprintf("%s/tenant-factory/tenant-project-contents", r.PkgPath)
	if err := kptGetAndSet(ctx, pkgURI, destDir, setters, r.Update); err != nil {
		return err
	}

	return nil
}

func (r *Runner) doTenantImageRepo(ctx context.Context, tenant Tenant, environ Environ) error {
	tenantName := tenant.ObjectMeta.Name
	environName := environ.ObjectMeta.Name
	klog.Infof("configuring image-repo for tenant %q in environ %q", tenantName, environName)
	destDir := filepath.Join(r.WorkDir, "environs", environName, "image-repo")
	setters := map[string]string{
		"platform-project-id":    environ.Spec.PlatformProjectRef.Name,
		"registry-location":      environ.Spec.RegistryLocation,
		"image-repo-admin-group": tenant.Spec.AdminGroup,
		"image-repo-name":        tenant.Name,
	}

	pkgURI := fmt.Sprintf("%s/image-repo", r.PkgPath)
	if err := kptGetAndSet(ctx, pkgURI, destDir, setters, r.Update); err != nil {
		return err
	}

	return nil
}

func (r *Runner) doTenantNamespace(ctx context.Context, tenant Tenant, cluster Cluster, environ Environ) error {
	tenantName := tenant.ObjectMeta.Name
	environName := environ.ObjectMeta.Name
	clusterName := cluster.ObjectMeta.Name
	klog.Infof("configuring namespace for tenant %q in cluster %q in environ %q", tenantName, clusterName, environName)
	destDir := filepath.Join(r.WorkDir, "environs", environName, "clusters", clusterName)
	setters := map[string]string{
		// tenant-name (inherited from Tenant package)
		// tenant-admin-group (inherited from Tenant package)
		"cluster-name": clusterName,
	}
	pkgURI := fmt.Sprintf("%s/tenant-factory/tenant-namespace", r.PkgPath)
	if err := kptGetAndSet(ctx, pkgURI, destDir, setters, r.Update); err != nil {
		return err
	}

	return nil
}
