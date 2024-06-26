export type User = {
  firstName: string
  lastName: string
  email: string
  password: string
  avatar?: { public_id: string; url: string }
  role?: string
  createdAt?: Date
}
