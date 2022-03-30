import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default class OAuth2Authenticator extends OAuth2PasswordGrant {
  serverTokenEndpoint = 'http://localhost:3000/users/sign_in';
  serverTokenRevocationEndpoint = 'http://localhost:3000/users/sign_out';
}