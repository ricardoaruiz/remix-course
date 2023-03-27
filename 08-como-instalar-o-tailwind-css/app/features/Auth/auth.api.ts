import bcrypt from 'bcryptjs'
import { z } from "zod"
import { db } from "~/db"

/**
 * Validate form schema
 * https://remix-forms.seasoned.cc/get-started#:~:text=%7B%20Form%20%7D-,Write%20your%20schema,-Compose%20a%20zod
 */
export const loginInputSchema = z.object({
  email: z.string().min(1, { message: 'Required field' }).email({ message: 'Invalid e-mail' }).trim(),
  password: z.string().min(1, { message: 'Required field' })
})

/**
 * Form type
 */
export type LoginInput = z.infer<typeof loginInputSchema>

/**
 * Login function
 * @param values 
 */
export const login = async (values: LoginInput) => {
  const user = await db.user.findUnique({ 
    where: {
      email: values.email
    }
  })
  
  if (!user) {
    throw "Invalid user or password"
  }

  const isValidPassword = bcrypt.compareSync(values.password, user.password)

  if (!isValidPassword) {
    throw "Invalid user or password"
  }

  return user
}