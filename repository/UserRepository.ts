import User from '../models/user'

export const registerUserRepository = async (user: User) => {
  const newUser = await User.create()
  return newUser
}

export const signInUserRepository = async (user: User) => {
  const newUser = await User.create()
  return newUser
}
