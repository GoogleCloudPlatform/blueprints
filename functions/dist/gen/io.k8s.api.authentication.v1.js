"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = exports.TokenReviewStatus = exports.TokenReviewSpec = exports.isTokenReview = exports.TokenReview = exports.TokenRequestStatus = exports.TokenRequestSpec = exports.isTokenRequest = exports.TokenRequest = exports.BoundObjectReference = void 0;
// BoundObjectReference is a reference to an object that a token is bound to.
class BoundObjectReference {
}
exports.BoundObjectReference = BoundObjectReference;
// TokenRequest requests a token for a given service account.
class TokenRequest {
    constructor(desc) {
        this.apiVersion = TokenRequest.apiVersion;
        this.kind = TokenRequest.kind;
        this.metadata = desc.metadata;
        this.spec = desc.spec;
        this.status = desc.status;
    }
}
exports.TokenRequest = TokenRequest;
function isTokenRequest(o) {
    return o && o.apiVersion === TokenRequest.apiVersion && o.kind === TokenRequest.kind;
}
exports.isTokenRequest = isTokenRequest;
(function (TokenRequest) {
    TokenRequest.apiVersion = "authentication.k8s.io/v1";
    TokenRequest.group = "authentication.k8s.io";
    TokenRequest.version = "v1";
    TokenRequest.kind = "TokenRequest";
})(TokenRequest = exports.TokenRequest || (exports.TokenRequest = {}));
// TokenRequestSpec contains client provided parameters of a token request.
class TokenRequestSpec {
    constructor(desc) {
        this.audiences = desc.audiences;
        this.boundObjectRef = desc.boundObjectRef;
        this.expirationSeconds = desc.expirationSeconds;
    }
}
exports.TokenRequestSpec = TokenRequestSpec;
// TokenRequestStatus is the result of a token request.
class TokenRequestStatus {
    constructor(desc) {
        this.expirationTimestamp = desc.expirationTimestamp;
        this.token = desc.token;
    }
}
exports.TokenRequestStatus = TokenRequestStatus;
// TokenReview attempts to authenticate a token to a known user. Note: TokenReview requests may be cached by the webhook token authenticator plugin in the kube-apiserver.
class TokenReview {
    constructor(desc) {
        this.apiVersion = TokenReview.apiVersion;
        this.kind = TokenReview.kind;
        this.metadata = desc.metadata;
        this.spec = desc.spec;
        this.status = desc.status;
    }
}
exports.TokenReview = TokenReview;
function isTokenReview(o) {
    return o && o.apiVersion === TokenReview.apiVersion && o.kind === TokenReview.kind;
}
exports.isTokenReview = isTokenReview;
(function (TokenReview) {
    TokenReview.apiVersion = "authentication.k8s.io/v1";
    TokenReview.group = "authentication.k8s.io";
    TokenReview.version = "v1";
    TokenReview.kind = "TokenReview";
})(TokenReview = exports.TokenReview || (exports.TokenReview = {}));
// TokenReviewSpec is a description of the token authentication request.
class TokenReviewSpec {
}
exports.TokenReviewSpec = TokenReviewSpec;
// TokenReviewStatus is the result of the token authentication request.
class TokenReviewStatus {
}
exports.TokenReviewStatus = TokenReviewStatus;
// UserInfo holds the information about the user needed to implement the user.Info interface.
class UserInfo {
}
exports.UserInfo = UserInfo;
//# sourceMappingURL=io.k8s.api.authentication.v1.js.map