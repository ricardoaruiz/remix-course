import { z } from 'zod'
import { db } from "~/db"

/**
 * 
 */
export const schema = z.object({
  name: z.string().min(1, { message: 'Provide a name'}).trim(),
  email: z.string().min(1, { message: 'Provide an e-mail' }).email({ message: 'Provide a valid e-mail' }).trim(),
  city: z.string().min(1, { message: 'Provide a city' }).trim(),
  state: z.string().min(1, { message: 'Provide a state' }).trim(),
})

type UserInput = z.infer<typeof schema>;

/**
 * Create a new user in DB
 * @param data 
 */
export const saveUser = async (data:  UserInput) => {
  await db.user.create({ data })
}

/**
 * Get all users from DB
 * @returns 
 */
export const getUsers = async () => {
  return db.user.findMany()
}