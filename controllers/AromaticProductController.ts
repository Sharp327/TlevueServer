import { getProductService, getProductsService, getProductsByCategoryService } from '../services/AromaticProductService'
import { Request, Response } from 'express'
import onError from '../middlewares/errors'

export const getProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const product = await getProductService(req.params.id)
    return res.status(201).json({
      product,
    })
  } catch (error: any) {
    onError(error, req, res)
  }
}

export const getProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const products = await getProductsService()
    return res.status(201).json({
      products,
    })
  } catch (error: any) {
    onError(error, req, res)
  }
}

export const getProductsByCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
  const products = await getProductsByCategoryService(req.body.filterData)
    return res.status(201).json({
      products,
    })
  } catch (error: any) {
    onError(error, req, res)
  }
}
