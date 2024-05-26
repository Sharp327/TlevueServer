import { registerUserService, signInUserService } from '../services/UserService'
import { Request, Response } from 'express'
import onError from '../middlewares/errors'
import { User } from '../types/User'

export const registerUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await registerUserService(req.body as User)
    return res.status(201).json({
      user,
    })
  } catch (error: any) {
    onError(error, req, res)
  }
}

export const signInUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await signInUserService(req.body as User)
    return res.status(201).json({
      user,
    })
  } catch (error: any) {
    onError(error, req, res)
  }
}
