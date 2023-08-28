import request from '@/config/axios'
import { IdStatusDto } from '@/api/dto/dto'
export interface DeptVO {
  id?: number
  name: string
  parentId: number
  status: number
  sort: number
  leaderUserId: number
  mobile: string
  email: string
  createTime: Date
}

// 查询部门（精简)列表
export const getSimpleDeptList = async (): Promise<DeptVO[]> => {
  return await request.get({ url: '/system/dept/list-all-simple' })
}

// 查询部门列表
export const getDeptPage = async (params: PageParam) => {
  return await request.get({ url: '/system/dept/list', params })
}

// 查询部门详情
export const getDept = async (id: number) => {
  return await request.get({ url: '/system/dept/getById?id=' + id })
}

// 新增部门
export const createDept = async (data: DeptVO) => {
  return await request.post({ url: '/system/dept/add', data: data })
}

// 修改部门
export const updateDept = async (params: DeptVO) => {
  return await request.put({ url: '/system/dept/update', data: params })
}

// 删除部门
export const deleteDept = async (id: number) => {
  return await request.delete({ url: '/system/dept/del?id=' + id })
}

// 修改部门状态
export const setStatus = async (data: IdStatusDto) => {
  return await request.put({ url: '/system/dept/setStatus', data: data })
}
