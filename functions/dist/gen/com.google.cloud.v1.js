"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBackendConfigList = exports.BackendConfigList = exports.isBackendConfig = exports.BackendConfig = void 0;
class BackendConfig {
    constructor(desc) {
        this.apiVersion = BackendConfig.apiVersion;
        this.kind = BackendConfig.kind;
        this.metadata = desc.metadata;
        this.spec = desc.spec;
        this.status = desc.status;
    }
}
exports.BackendConfig = BackendConfig;
function isBackendConfig(o) {
    return o && o.apiVersion === BackendConfig.apiVersion && o.kind === BackendConfig.kind;
}
exports.isBackendConfig = isBackendConfig;
(function (BackendConfig) {
    BackendConfig.apiVersion = "cloud.google.com/v1";
    BackendConfig.group = "cloud.google.com";
    BackendConfig.version = "v1";
    BackendConfig.kind = "BackendConfig";
    // named constructs a BackendConfig with metadata.name set to name.
    function named(name) {
        return new BackendConfig({ metadata: { name } });
    }
    BackendConfig.named = named;
    // BackendConfigSpec is the spec for a BackendConfig resource
    class Spec {
    }
    BackendConfig.Spec = Spec;
    (function (Spec) {
        // CDNConfig contains configuration for CDN-enabled backends.
        class Cdn {
            constructor(desc) {
                this.cachePolicy = desc.cachePolicy;
                this.enabled = desc.enabled;
            }
        }
        Spec.Cdn = Cdn;
        (function (Cdn) {
            // CacheKeyPolicy contains configuration for how requests to a CDN-enabled backend are cached.
            class CachePolicy {
            }
            Cdn.CachePolicy = CachePolicy;
        })(Cdn = Spec.Cdn || (Spec.Cdn = {}));
        // ConnectionDrainingConfig contains configuration for connection draining. For now the draining timeout. May manage more settings in the future.
        class ConnectionDraining {
        }
        Spec.ConnectionDraining = ConnectionDraining;
        // CustomRequestHeadersConfig contains configuration for custom request headers
        class CustomRequestHeaders {
        }
        Spec.CustomRequestHeaders = CustomRequestHeaders;
        // HealthCheckConfig contains configuration for the health check.
        class HealthCheck {
        }
        Spec.HealthCheck = HealthCheck;
        // IAPConfig contains configuration for IAP-enabled backends.
        class Iap {
            constructor(desc) {
                this.enabled = desc.enabled;
                this.oauthclientCredentials = desc.oauthclientCredentials;
            }
        }
        Spec.Iap = Iap;
        (function (Iap) {
            // OAuthClientCredentials contains credentials for a single IAP-enabled backend.
            class OauthclientCredentials {
                constructor(desc) {
                    this.clientID = desc.clientID;
                    this.clientSecret = desc.clientSecret;
                    this.secretName = desc.secretName;
                }
            }
            Iap.OauthclientCredentials = OauthclientCredentials;
        })(Iap = Spec.Iap || (Spec.Iap = {}));
        // LogConfig contains configuration for logging.
        class Logging {
        }
        Spec.Logging = Logging;
        // SecurityPolicyConfig contains configuration for CloudArmor-enabled backends.
        class SecurityPolicy {
            constructor(desc) {
                this.name = desc.name;
            }
        }
        Spec.SecurityPolicy = SecurityPolicy;
        // SessionAffinityConfig contains configuration for stickyness parameters.
        class SessionAffinity {
        }
        Spec.SessionAffinity = SessionAffinity;
    })(Spec = BackendConfig.Spec || (BackendConfig.Spec = {}));
})(BackendConfig = exports.BackendConfig || (exports.BackendConfig = {}));
// BackendConfigList is a list of BackendConfig
class BackendConfigList {
    constructor(desc) {
        this.apiVersion = BackendConfigList.apiVersion;
        this.items = desc.items.map((i) => new BackendConfig(i));
        this.kind = BackendConfigList.kind;
        this.metadata = desc.metadata;
    }
}
exports.BackendConfigList = BackendConfigList;
function isBackendConfigList(o) {
    return o && o.apiVersion === BackendConfigList.apiVersion && o.kind === BackendConfigList.kind;
}
exports.isBackendConfigList = isBackendConfigList;
(function (BackendConfigList) {
    BackendConfigList.apiVersion = "cloud.google.com/v1";
    BackendConfigList.group = "cloud.google.com";
    BackendConfigList.version = "v1";
    BackendConfigList.kind = "BackendConfigList";
    // ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
    class Metadata {
    }
    BackendConfigList.Metadata = Metadata;
})(BackendConfigList = exports.BackendConfigList || (exports.BackendConfigList = {}));
//# sourceMappingURL=com.google.cloud.v1.js.map