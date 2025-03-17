import 'dotenv/config';

interface EnvConfig {
  BASE_URL: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  USERNAME: string;
  PASSWORD: string;
  TENANT_ID: string;
  REJECT_UNAUTHORIZED: boolean;
  ALLOWED_APIS: string[];
}

export const config: EnvConfig = {
  BASE_URL: process.env.BASE_URL!,
  CLIENT_ID: process.env.CLIENT_ID!,
  CLIENT_SECRET: process.env.CLIENT_SECRET!,
  USERNAME: process.env.USERNAME!,
  PASSWORD: process.env.PASSWORD!,
  TENANT_ID: process.env.TENANT_ID!,
  REJECT_UNAUTHORIZED: process.env.REJECT_UNAUTHORIZED === 'true',
  ALLOWED_APIS: process.env.ALLOWED_APIS ? process.env.ALLOWED_APIS.split(',') : [],
};
