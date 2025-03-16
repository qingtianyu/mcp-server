import { userQuerySchema, financeQuerySchema } from '../tools/schemas.js';

const API_ENDPOINTS = [
    {
        name: 'get_users',
        inputSchema: userQuerySchema,
        description: '获取用户列表',
        path: '/admin-api/system/user/page',
        method: 'GET'
    },
    {
        name: 'get_finance_details', 
        inputSchema: financeQuerySchema,
        description: '获取财务明细',
        path: '/admin-api/fee/report/fee-details',
        method: 'GET'
    }
]

export const tools = API_ENDPOINTS.map(endpoint => ({
    name: endpoint.name,
    description: endpoint.description,
    inputSchema: endpoint.inputSchema
}));

export const apiMap = API_ENDPOINTS.reduce((acc, endpoint) => {
    acc[endpoint.name] = endpoint;
    return acc;
}, {} as Record<string, typeof API_ENDPOINTS[number]>);
