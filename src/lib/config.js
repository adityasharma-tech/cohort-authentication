
const openIdJsonConfig = {
  "issuer": `${process.env.DOMAIN}/`,
  "authorization_endpoint": `${process.env.DOMAIN}/authorize`,
  "token_endpoint": `${process.env.DOMAIN}/oauth/token`, // almost done
  "device_authorization_endpoint": `${process.env.DOMAIN}/oauth/device/code`, // not required yet
  "userinfo_endpoint": `${process.env.DOMAIN}/userinfo`,
  "mfa_challenge_endpoint": `${process.env.DOMAIN}/mfa/challenge`, // not required
  "jwks_uri": `${process.env.DOMAIN}/.well-known/jwks.json`, // done
  "registration_endpoint": `${process.env.DOMAIN}/oidc/register`,
  "revocation_endpoint": `${process.env.DOMAIN}/oauth/revoke`,
  "scopes_supported": [
    "openid", // something somethign
    "profile",
    "name",
    "email",
    "email_verified",
    "created_at",
    "phone"
  ],
  "response_types_supported": [
    // "code",
    "token",
    // "id_token",
    // "code token",
    // "code id_token",
    // "token id_token",
    // "code token id_token"
  ],
  "code_challenge_methods_supported": [
    "S256",
    "plain"
  ],
  "response_modes_supported": [
    "query",
    "fragment",
    "form_post"
  ],
  "subject_types_supported": [
    "public"
  ],
  "id_token_signing_alg_values_supported": [
    // "HS256",
    "RS256",
    // "PS256"
  ],
  "token_endpoint_auth_methods_supported": [
    "client_secret_basic",
    "client_secret_post",
    "private_key_jwt"
  ],
  "claims_supported": [
    "iss", // $process.env.DOMAIN
    "sub", // the user id of the platform database
    "aud", // [] // array or may be a single case sensitive string of`client_id`
    "exp", // Date.now() + 60 * 5 * 1000
    "iat", // time at which the jwt token is issued
    "email",
    "email_verified",
    "name", // full name of the user
    "phone_number",
    "picture", // url of the picture
  ],
  "request_uri_parameter_supported": false,
  "request_parameter_supported": false,
  "token_endpoint_auth_signing_alg_values_supported": [
    "RS256",
    // "RS384",
    // "PS256"
  ]
}


export {
    openIdJsonConfig
}