import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { apiClient } from '../../config/http.js';
import { config } from '../../config/env.js';

interface Token {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

let currentToken: Token = {
  access_token: '',
  refresh_token: '',
  expires_at: 0
};

export async function initializeAuth(): Promise<void> {
  try {
    await getNewToken();
  } catch (error) {
    console.error('Failed to initialize auth:', error);
    throw new McpError(ErrorCode.InternalError, 'Initial authentication failed');
  }
}

export async function ensureValidToken(): Promise<string> {
  if (currentToken.expires_at === 0 || Date.now() < currentToken.expires_at - 5000) {
    return currentToken.access_token;
  }
  return await refreshToken();
}

export async function getNewToken(): Promise<string> {
  try {
    const response = await apiClient.post('/admin-api/system/oauth2/token', null, {
      params: {
        grant_type: 'password',
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        username: config.USERNAME,
        password: config.PASSWORD
      }
    });

    currentToken = {
      access_token: response.data.data.access_token,
      refresh_token: response.data.data.refresh_token,
      expires_at: Date.now() + response.data.data.expires_in * 1000
    };
    return currentToken.access_token;
  } catch (error) {
    console.error('Failed to get new token:', error);
    throw new McpError(ErrorCode.InternalError, '获取Token失败');
  }
}

async function refreshToken(): Promise<string> {
  try {
    const response = await apiClient.post('/admin-api/system/oauth2/token', null, {
      params: {
        grant_type: 'refresh_token',
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        refresh_token: currentToken.refresh_token
      }
    });

    currentToken = {
      access_token: response.data.data.access_token,
      refresh_token: response.data.data.refresh_token,
      expires_at: Date.now() + response.data.data.expires_in * 1000
    };
    return currentToken.access_token;
  } catch (error) {
    throw new McpError(ErrorCode.InternalError, '刷新Token失败');
  }
}
