const env: any = {
  production: false,
  baseUrl: 'http://localhost',
};

env.baseApiUrl = `${env.baseUrl}/api/v1`;

export const environment = env;
