// Documentation for setting up JWT authentication with Auth0: https://auth0.com/docs/quickstart/backend/nodejs/interactive
import { auth } from 'express-oauth2-jwt-bearer';

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256',
});

export default checkJwt;
