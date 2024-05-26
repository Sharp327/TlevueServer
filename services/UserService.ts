import User from '../models/user'
import { registerUserRepository, signInUserRepository } from '../repository/UserRepository'
import ValidationError from '../utils/errors/ValidationError'

export const registerUserService = async (user: User) => {
  if (!user.name || !user.email || !user.password)
    throw new ValidationError("Can't be empty", 400)
  const newUser = await registerUserRepository(user)
  return newUser
}

export const signInUserService = async (user: User) => {
  if (!user.name || !user.email || !user.password)
    throw new ValidationError("Can't be empty", 400)
  const newUser = await signInUserRepository(user)
  return newUser
}
