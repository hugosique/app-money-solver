export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',

  port: Number(process.env.PORT ?? 3000),

  database: {
    url: process.env.DATABASE_URL,
  },

  auth: {
    accessToken: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    },

    refreshToken: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d',
    },
  },
});