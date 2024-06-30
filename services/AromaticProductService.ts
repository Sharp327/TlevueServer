import { ParsedQs } from 'qs'
import { getProductRepository, getProductsRepository, getProductsByCategoryRepository } from '../repository/AromaticProductRepository'

export const getProductService = async (id: string | ParsedQs | string[] | ParsedQs[] | undefined) => {
  const newProduct = await getProductRepository(id)
  return newProduct
}

export const getProductsService = async (page: string) => {
  const newProducts = await getProductsRepository(page)
  return newProducts
}

export const getProductsByCategoryService = async (filterData: any) => {
  const newProducts = await getProductsByCategoryRepository(filterData)
  return newProducts
}
