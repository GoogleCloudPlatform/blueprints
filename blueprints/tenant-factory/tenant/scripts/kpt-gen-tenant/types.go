package main

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

type Environ struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              EnvironSpec `json:"spec"`
}

type EnvironSpec struct {
	OrganizationID     string      `json:"organizationId"`
	BillingAccountID   string      `json:"billingAccountId"`
	AdminProjectRef    ResourceRef `json:"adminProjectRef"`
	NetworkProjectRef  ResourceRef `json:"networkProjectRef"`
	PlatformProjectRef ResourceRef `json:"platformProjectRef"`
	RegistryLocation   string      `json:"registryLocation"`
}

type ResourceRef struct {
	metav1.TypeMeta `json:",inline"`
	Name            string `json:"name"`
	Namespace       string `json:"namespace"`
}

type Tenant struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Spec              TenantSpec `json:"spec"`
}

type TenantSpec struct {
	AdminGroup  string        `json:"adminGroup"`
	EnvironRefs []ResourceRef `json:"environRefs"`
}

type Cluster struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`
}
