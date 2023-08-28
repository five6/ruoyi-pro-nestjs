import request from '@/config/axios'

export interface PermissionAssignUserRoleReqVO {
  userId: string
  roleIds: string[]
}

export interface PermissionAssignRoleMenuReqVO {
  roleId: string
  menuIds: string[]
}

export interface PermissionAssignRoleDataScopeReqVO {
  roleId: string
  dataScope: number
  dataScopeDeptIds: string[]
}

// 查询角色拥有的菜单权限
export const getRoleMenuList = async (roleId: number) => {
  return await request.get({ url: '/system/permission/list-role-resources?roleId=' + roleId })
}

// 赋予角色菜单权限
export const assignRoleMenu = async (data: PermissionAssignRoleMenuReqVO) => {
  return await request.post({ url: '/system/permission/assign-role-menu', data })
}

// 赋予角色数据权限
export const assignRoleDataScope = async (data: PermissionAssignRoleDataScopeReqVO) => {
  return await request.post({ url: '/system/permission/assign-role-data-scope', data })
}

// 查询用户拥有的角色数组
export const getUserRoleList = async (userId: number) => {
  return await request.get({ url: '/system/permission/list-user-roles?userId=' + userId })
}

// 赋予用户角色
export const assignUserRole = async (data: PermissionAssignUserRoleReqVO) => {
  return await request.post({ url: '/system/permission/assign-user-role', data })
}
