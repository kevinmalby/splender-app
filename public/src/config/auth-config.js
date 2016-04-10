import config from './config';

let authConfig = {
  baseUrl: config.hostUrl,
  signupUrl: '/api/users',
  loginUrl: '/api/authenticate',
  loginRoute: '#/signin',
  signupRoute: '#/signup',
  tokenName: 'token',
  authHeader: 'x-access-token',
  authToken: '',

  // Disabled all redirects because it was causing the entire app
  // to reload
  loginRedirect: '',
  signupRedirect: '',
  logoutRedirect: ''
};

export default authConfig;