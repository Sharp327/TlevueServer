import { Request, Response } from 'express'
import onError from '../middlewares/errors'
import { getMenuService } from '../services/MenuService'

export const getMenuController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log('Data seeded successfully!1');
    const menus = await getMenuService()
    return res.status(201).json({
      menus,
    })
  } catch (error: any) {
    onError(error, req, res)
  }
}
