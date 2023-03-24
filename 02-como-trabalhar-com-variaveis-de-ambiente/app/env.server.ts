// This file 
// 1 - Validate environment variables with Zod 
// 2 - Declare a ENV variable on global
// 3 - Export a function that returns environment variables

import z from 'zod'

const schema = z.object({
  DB_CONNECTION_STRING: z.string().min(1),
  TIMEOUT: z.coerce.number().positive()
})

type ENV = z.infer<typeof schema>

declare global {
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}

export const getEnv = () => {
  return schema.parse(process.env)
}