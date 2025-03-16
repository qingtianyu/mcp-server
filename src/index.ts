#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './tools/index.js';
import { initializeAuth } from './modules/auth/token.js';

// 初始化MCP服务器
const transport = new StdioServerTransport();
const server = new Server(
  {
    name: 'api-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 注册工具和处理器
registerTools(server);

// 启动服务器
server.connect(transport).then(() => {
  initializeAuth();
  console.error('API MCP服务器已启动');
});
