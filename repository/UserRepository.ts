import User from '../models/user'
import bcrypt from 'bcryptjs';
import ValidationError from '../utils/errors/ValidationError'

export const registerUserRepository = async (user: User) => {
  const { firstName, lastName, email, password } = user;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ firstName, lastName, email, password: hashedPassword });
  await newUser.save();
  return newUser
}

export const signInUserRepository = async (user: User) => {
  const { email, password } = user;

  const loginUser = await User.findOne({ email });

  if (!loginUser) {
    throw new ValidationError("Invalid email or password", 400)
  }

  const validPassword = await bcrypt.compare(password, loginUser.password);
  if (!validPassword) {
    throw new ValidationError("Invalid email or password", 400)
  }
  loginUser.password="";
  return loginUser
}
