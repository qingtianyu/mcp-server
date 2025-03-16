/**
 * @description 用户查询参数校验
 */
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
