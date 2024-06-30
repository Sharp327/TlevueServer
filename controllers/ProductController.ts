import { getProductService, getProductsService, getProductsByCategoryService } from '../services/ProductService'
import { Request, Response } from 'express'
import onError from '../middlewares/errors'
import Product from '../models/product'
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
    const products = await getProductsService(req.body.page)
    return res.status(201).json({
      products,
    })
  } catch (error: any) {
    onError(error, req, res)
  }
}


export const putProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });

    if (!updatedProduct) {
      return res.status(404).send({ error: 'Product not found' });
    }

    res.status(200).send({ product: updatedProduct });
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
