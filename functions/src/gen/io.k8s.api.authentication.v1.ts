import { KubernetesObject } from 'kpt-functions';
import * as apisMetaV1 from './io.k8s.apimachinery.pkg.apis.meta.v1';

// BoundObjectReference is a reference to an object that a token is bound to.
export class BoundObjectReference {
  // API version of the referent.
  public apiVersion?: string;

  // Kind of the referent. Valid kinds are 'Pod' and 'Secret'.
  public kind?: string;

  // Name of the referent.
  public name?: string;

  // UID of the referent.
  public uid?: string;
}

// TokenRequest requests a token for a given service account.
export class TokenRequest implements KubernetesObject {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  public metadata: apisMetaV1.ObjectMeta;

  public spec: TokenRequestSpec;

  public status?: TokenRequestStatus;

  constructor(desc: TokenRequest.Interface) {
    this.apiVersion = TokenRequest.apiVersion;
    this.kind = TokenRequest.kind;
    this.metadata = desc.metadata;
    this.spec = desc.spec;
    this.status = desc.status;
  }
}

export function isTokenRequest(o: any): o is TokenRequest {
  return o && o.apiVersion === TokenRequest.apiVersion && o.kind === TokenRequest.kind;
}

export namespace TokenRequest {
  export const apiVersion = "authentication.k8s.io/v1";
  export const group = "authentication.k8s.io";
  export const version = "v1";
  export const kind = "TokenRequest";

  // TokenRequest requests a token for a given service account.
  export interface Interface {
    metadata: apisMetaV1.ObjectMeta;

    spec: TokenRequestSpec;

    status?: TokenRequestStatus;
  }
}

// TokenRequestSpec contains client provided parameters of a token request.
export class TokenRequestSpec {
  // Audiences are the intendend audiences of the token. A recipient of a token must identitfy themself with an identifier in the list of audiences of the token, and otherwise should reject the token. A token issued for multiple audiences may be used to authenticate against any of the audiences listed but implies a high degree of trust between the target audiences.
  public audiences: string[];

  // BoundObjectRef is a reference to an object that the token will be bound to. The token will only be valid for as long as the bound object exists. NOTE: The API server's TokenReview endpoint will validate the BoundObjectRef, but other audiences may not. Keep ExpirationSeconds small if you want prompt revocation.
  public boundObjectRef?: BoundObjectReference;

  // ExpirationSeconds is the requested duration of validity of the request. The token issuer may return a token with a different validity duration so a client needs to check the 'expiration' field in a response.
  public expirationSeconds?: number;

  constructor(desc: TokenRequestSpec) {
    this.audiences = desc.audiences;
    this.boundObjectRef = desc.boundObjectRef;
    this.expirationSeconds = desc.expirationSeconds;
  }
}

// TokenRequestStatus is the result of a token request.
export class TokenRequestStatus {
  // ExpirationTimestamp is the time of expiration of the returned token.
  public expirationTimestamp: apisMetaV1.Time;

  // Token is the opaque bearer token.
  public token: string;

  constructor(desc: TokenRequestStatus) {
    this.expirationTimestamp = desc.expirationTimestamp;
    this.token = desc.token;
  }
}

// TokenReview attempts to authenticate a token to a known user. Note: TokenReview requests may be cached by the webhook token authenticator plugin in the kube-apiserver.
export class TokenReview implements KubernetesObject {
  // APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
  public apiVersion: string;

  // Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
  public kind: string;

  public metadata: apisMetaV1.ObjectMeta;

  // Spec holds information about the request being evaluated
  public spec: TokenReviewSpec;

  // Status is filled in by the server and indicates whether the request can be authenticated.
  public status?: TokenReviewStatus;

  constructor(desc: TokenReview.Interface) {
    this.apiVersion = TokenReview.apiVersion;
    this.kind = TokenReview.kind;
    this.metadata = desc.metadata;
    this.spec = desc.spec;
    this.status = desc.status;
  }
}

export function isTokenReview(o: any): o is TokenReview {
  return o && o.apiVersion === TokenReview.apiVersion && o.kind === TokenReview.kind;
}

export namespace TokenReview {
  export const apiVersion = "authentication.k8s.io/v1";
  export const group = "authentication.k8s.io";
  export const version = "v1";
  export const kind = "TokenReview";

  // TokenReview attempts to authenticate a token to a known user. Note: TokenReview requests may be cached by the webhook token authenticator plugin in the kube-apiserver.
  export interface Interface {
    metadata: apisMetaV1.ObjectMeta;

    // Spec holds information about the request being evaluated
    spec: TokenReviewSpec;

    // Status is filled in by the server and indicates whether the request can be authenticated.
    status?: TokenReviewStatus;
  }
}

// TokenReviewSpec is a description of the token authentication request.
export class TokenReviewSpec {
  // Audiences is a list of the identifiers that the resource server presented with the token identifies as. Audience-aware token authenticators will verify that the token was intended for at least one of the audiences in this list. If no audiences are provided, the audience will default to the audience of the Kubernetes apiserver.
  public audiences?: string[];

  // Token is the opaque bearer token.
  public token?: string;
}

// TokenReviewStatus is the result of the token authentication request.
export class TokenReviewStatus {
  // Audiences are audience identifiers chosen by the authenticator that are compatible with both the TokenReview and token. An identifier is any identifier in the intersection of the TokenReviewSpec audiences and the token's audiences. A client of the TokenReview API that sets the spec.audiences field should validate that a compatible audience identifier is returned in the status.audiences field to ensure that the TokenReview server is audience aware. If a TokenReview returns an empty status.audience field where status.authenticated is "true", the token is valid against the audience of the Kubernetes API server.
  public audiences?: string[];

  // Authenticated indicates that the token was associated with a known user.
  public authenticated?: boolean;

  // Error indicates that the token couldn't be checked
  public error?: string;

  // User is the UserInfo associated with the provided token.
  public user?: UserInfo;
}

// UserInfo holds the information about the user needed to implement the user.Info interface.
export class UserInfo {
  // Any additional information provided by the authenticator.
  public extra?: {[key: string]: string[]};

  // The names of groups this user is a part of.
  public groups?: string[];

  // A unique value that identifies this user across time. If this user is deleted and another user by the same name is added, they will have different UIDs.
  public uid?: string;

  // The name that uniquely identifies this user among all active users.
  public username?: string;
}