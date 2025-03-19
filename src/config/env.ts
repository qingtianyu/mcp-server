import 'dotenv/config';

// Dynamically read the OpenAPI definitions from the specified URL
export interface OpenApiParameter {
  name: string;
  in: string;
  description: string;
  required?: boolean;
  schema?: {
      type: string;
      default?: any;
  };
}

export interface OpenApiMethod {
  operationId: string;
  summary: string;
  parameters?: OpenApiParameter[];
}

export interface OpenApiPath {
  [key: string]: {
      [method: string]: OpenApiMethod;
  };
}

export interface OpenApiData {
  paths: OpenApiPath;
}

export interface ApiConfig {
  path: string;
  description: string;
}

export interface ApiEndpoint {
  name: string;
  description: string;
  inputSchema: {
      type: string;
      properties: Record<string, any>;
  } | {};
  path: string;
  method: string;
}

export interface EnvConfig {
  BASE_URL: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  USERNAME: string;
  PASSWORD: string;
  TENANT_ID: string;
  REJECT_UNAUTHORIZED: boolean;
  ALLOWED_APIS: string;
  ALLOWED_APIS_CONFIG_PATH: string;
}

export const config: EnvConfig = {
  BASE_URL: process.env.BASE_URL!,
  CLIENT_ID: process.env.CLIENT_ID!,
  CLIENT_SECRET: process.env.CLIENT_SECRET!,
  USERNAME: process.env.USERNAME!,
  PASSWORD: process.env.PASSWORD!,
  TENANT_ID: process.env.TENANT_ID!,
  REJECT_UNAUTHORIZED: process.env.REJECT_UNAUTHORIZED === 'true',
  ALLOWED_APIS: process.env.ALLOWED_APIS || '',
  ALLOWED_APIS_CONFIG_PATH: process.env.ALLOWED_APIS_CONFIG_PATH || '',
};