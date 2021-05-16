export default {
  jwt: {
    secret: process.env.APP_SECRET || 'secret-fake',
    exp: '30m',
    secret_refresh_token: process.env.APP_SECRET_REFRESH_TOKEN || 'secret-fake',
    expires_in_refresh_token: '8h',
    expires_refresh_token_days: 30,
  },
};
