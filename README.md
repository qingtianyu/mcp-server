# MCP API Server

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.0%2B-blue)](https://www.typescriptlang.org/)

企业级微服务API服务端，提供用户管理和财务明细核心功能，支持MCP协议扩展。

## ✨ 功能特性
- 用户信息管理（部门/状态/分页查询）
- 财务明细记录（账户类型/金额说明/时间范围查询）
- MCP协议集成（支持工具扩展和资源访问）
- TypeScript强类型支持

## 🚀 快速开始

### 前置要求
- Node.js 18+
- npm 9+
- TypeScript 5.0+

### 安装步骤
```bash
# 克隆仓库
git clone https://github.com/your-repo/mcp-api-server.git

# 安装依赖
npm install

# 生产环境构建
npm run build

# 启动服务（开发模式）
npm run dev
```

### MCP 配置参数
```json
{
  "mcpServers": {
    "api-server": {
      "command": "node",
      "args": [
        "D:/api-server/build/index.js"
      ],
      "env": {
        "BASE_URL": "https://127.0.0.0:8080",
        "CLIENT_ID": "xxx",
        "CLIENT_SECRET": "xxx",
        "USERNAME": "xxx",
        "PASSWORD": "xxx",
        "TENANT_ID": "1",
        "REJECT_UNAUTHORIZED": "false"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## 📂 项目结构
```bash
mcp-api-server/
├── build/          # 编译输出目录
├── src/            # 源代码
│   ├── config/     # 配置模块
│   ├── modules/    # 业务模块
│   └── tools/      # MCP工具协议
├── package.json
└── tsconfig.json
```

## 📡 MCP Tools

### 通过apiEndpoints.ts扩展工具
```code
[
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
```
### 通过schemas.ts配置对应工具参数
```code
export const userQuerySchema = {
  type: 'object',
  properties: {
    deptId: { type: 'string', description: '部门ID', nullable: true },
    username: { type: 'string', description: '用户名', nullable: true },
    mobile: { type: 'string', description: '手机号', nullable: true },
    status: { type: 'number', description: '状态：0-正常，1-停用', nullable: true },
    createTime: { 
      type: 'array',
      items: { type: 'string' },
      description: '创建时间范围',
      nullable: true 
    },
    pageNo: { type: 'number', description: '页码', default: 1 },
    pageSize: { type: 'number', description: '每页条数', default: 10 },
  },
  required: ['pageNo', 'pageSize'], // 默认值已设置为1和10
}
/**
 * @description 财务查询参数校验
 */
export const financeQuerySchema = {
  type: 'object',
  properties: {
    deptName: { type: 'string', description: '部门名称', nullable: true },
    employeeName: { type: 'string', description: '员工姓名', nullable: true },
    accountName: { type: 'string', description: '账户名称', nullable: true },
    accountType: { type: 'string', description: '账户类型', nullable:true },
    amount: { type: 'string', description: '金额', nullable: true },
    explanation: { type: 'string', description: '说明', nullable: true },
    date: { 
      type: 'array',
      items: { type: 'string' },
      description: '日期范围',
      nullable: true 
    },
    appId: { type: 'string', description: '应用ID', nullable: true },
  },
  required: ['pageNo', 'pageSize'],
}
```

## 🤝 贡献指南
1. Fork项目仓库
2. 创建特性分支 (`git checkout -b feature/your-feature`)
3. 提交修改 (`git commit -m 'Add some feature'`)
4. 推送分支 (`git push origin feature/your-feature`)
5. 创建Pull Request

## 📄 许可证
MIT License
