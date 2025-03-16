import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { apiClient } from '../config/http.js';
import { tools, apiMap } from '../config/apiEndpoints.js';

export function registerTools(server: Server) {
  // 注册可用工具
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools
  }));

  // 处理工具调用请求
  server.setRequestHandler(CallToolRequestSchema, async (request: { params: { name: string; arguments?: unknown, _meta?: unknown; } }) => {
    
    try {
      const endpoint = apiMap[request.params.name]
      if (!endpoint) {
        throw new McpError(ErrorCode.MethodNotFound, '未知的工具方法');
      }
      if(endpoint.method === 'GET') {
        const params = request.params.arguments;
        const response = await apiClient.get(endpoint.path, {
          params
        });
        return { content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }] };
      } else {
        const params = request.params.arguments;
        const response = await apiClient.post(endpoint.path, params);
        return { content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }] };
      }
    } catch (error) {
      if (error instanceof McpError) {
        throw error;
      }
      return {
        content: [{ type: 'text', text: `请求处理失败: ${error instanceof Error ? error.message : '未知错误'}` }],
        isError: true
      };
    }
  });
}
