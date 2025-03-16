import { config } from './env.js';
import axios from 'axios';
import https from 'https';

import { ensureValidToken } from '../modules/auth/token.js';

export const apiClient = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'Tenant-Id': config.TENANT_ID,
    'Content-Type': 'application/json'
  },
  httpsAgent: new https.Agent({ 
    rejectUnauthorized: config.REJECT_UNAUTHORIZED
  })
});

// 添加请求拦截器统一设置token
apiClient.interceptors.request.use(async (config) => {
  const accessToken = await ensureValidToken();
  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
