import request from '@/config/axios'

export interface Property {
  propertyId?: number // 属性编号
  propertyName?: string // 属性名称
  valueId?: number // 属性值编号
  valueName?: string // 属性值名称
}

// TODO puhui999：是不是直接叫 Sku 更简洁一点哈。type 待后面，总感觉有个类型？
export interface SkuType {
  id?: number // 商品 SKU 编号
  spuId?: number // SPU 编号
  properties?: Property[] // 属性数组
  price?: number // 商品价格
  marketPrice?: number // 市场价
  costPrice?: number // 成本价
  barCode?: string // 商品条码
  picUrl?: string // 图片地址
  stock?: number // 库存
  weight?: number // 商品重量，单位：kg 千克
  volume?: number // 商品体积，单位：m^3 平米
  subCommissionFirstPrice?: number // 一级分销的佣金
  subCommissionSecondPrice?: number // 二级分销的佣金
  salesCount?: number // 商品销量
}

// TODO puhui999：是不是直接叫 Spu 更简洁一点哈。type 待后面，总感觉有个类型？
export interface SpuType {
  id?: number
  name?: string // 商品名称
  categoryId?: number | null // 商品分类
  keyword?: string // 关键字
  unit?: number | null // 单位
  picUrl?: string // 商品封面图
  sliderPicUrls?: string[] // 商品轮播图
  introduction?: string // 商品简介
  deliveryTemplateId?: number | null // 运费模版
  brandId?: number | null // 商品品牌编号
  specType?: boolean // 商品规格
  subCommissionType?: boolean // 分销类型
  skus: SkuType[] // sku数组
  description?: string // 商品详情
  sort?: string // 商品排序
  giveIntegral?: number // 赠送积分
  virtualSalesCount?: number // 虚拟销量
  recommendHot?: boolean // 是否热卖
  recommendBenefit?: boolean // 是否优惠
  recommendBest?: boolean // 是否精品
  recommendNew?: boolean // 是否新品
  recommendGood?: boolean // 是否优品
}

// 获得 Spu 列表
export const getSpuPage = (params: PageParam) => {
  return request.get({ url: '/product/spu/page', params })
}

// 获得 Spu 列表 tabsCount
export const getTabsCount = () => {
  return request.get({ url: '/product/spu/get-count' })
}

// 创建商品 Spu
export const createSpu = (data: SpuType) => {
  return request.post({ url: '/product/spu/create', data })
}

// 更新商品 Spu
export const updateSpu = (data: SpuType) => {
  return request.put({ url: '/product/spu/update', data })
}

// 更新商品 Spu status
export const updateStatus = (data: { id: number; status: number }) => {
  return request.put({ url: '/product/spu/update-status', data })
}

// 获得商品 Spu
export const getSpu = (id: number) => {
  return request.get({ url: `/product/spu/get-detail?id=${id}` })
}

// 删除商品 Spu
export const deleteSpu = (id: number) => {
  return request.delete({ url: `/product/spu/delete?id=${id}` })
}

// 导出商品 Spu Excel
export const exportSpu = async (params) => {
  return await request.download({ url: '/product/spu/export', params })
}
