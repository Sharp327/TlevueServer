import { Request, Response } from 'express'
import onError from '../middlewares/errors'
import { getMenuService } from '../services/MenuService'

export const getMenuController = async (
  req: Request,
  res: Response
) => {
  try {
    const menus = await getMenuService(req.query.pagetype)
    return res.status(201).json({
      menus,
    })
  } catch (error: any) {
    onError(error, req, res)
  }
}
