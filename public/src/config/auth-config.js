let config = {
  baseUrl: 'http://localhost:9000',
  signupUrl: '/api/users',
  loginUrl: '/api/authenticate',
  loginRoute: '#/signin',
  signupRoute: '#/signup',
  tokenName: 'token',

  // Disabled all redirects because it was causing the entire app
  // to reload
  loginRedirect: '',
  signupRedirect: '',
  logoutRedirect: ''
}

export default config;