import { ParsedQs } from 'qs'
import { getProductRepository, getProductsRepository, getProductsByCategoryRepository } from '../repository/AromaticProductRepository'

export const getProductService = async (id: string | ParsedQs | string[] | ParsedQs[] | undefined) => {
  const newProduct = await getProductRepository(id)
  return newProduct
}

export const getProductsService = async () => {
  const newProducts = await getProductsRepository()
  return newProducts
}

export const getProductsByCategoryService = async (filterData: any) => {
  const newProducts = await getProductsByCategoryRepository(filterData)
  return newProducts
}
