const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development',
  secret_key: process.env.JWT_ACCESS_TOKEN_SECRET,
  refresh_token_key: process.env.JWT_REFRESH_TOKEN_SECRET,
  swagger: {
    username: process.env.SWAGGER_USERNAME,
    password: process.env.SWAGGER_PASSWORD,
  },
});

export default config;

export type AppConfig = ReturnType<typeof config>;
