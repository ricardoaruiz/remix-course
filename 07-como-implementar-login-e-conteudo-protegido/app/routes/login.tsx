import type { ActionArgs, LinksFunction } from "@remix-run/node";
import { performMutation } from "remix-forms";

import { z } from "zod"
import { makeDomainFunction } from 'domain-functions'

import { Form } from "~/remix-forms"

import formsStyles from '~/styles/forms.css'

/**
 * Validate form schema
 * https://remix-forms.seasoned.cc/get-started#:~:text=%7B%20Form%20%7D-,Write%20your%20schema,-Compose%20a%20zod
 */
const loginInputSchema = z.object({
  email: z.string().min(1, { message: 'Required field' }).email({ message: 'Invalid e-mail' }).trim(),
  password: z.string().min(1, { message: 'Required field' })
})

/**
 * Form type
 */
type LoginInput = z.infer<typeof loginInputSchema>

/**
 * Form initial values
 */
const values: LoginInput = {
  email: 'Lindsey41@hotmail.com',
  password: '123456'
}

/**
 * Import style sheet
 * @returns 
 */
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: formsStyles }
  ];
};

/**
 * Mutation remix-forms
 * https://remix-forms.seasoned.cc/get-started#:~:text=Create%20your%20mutation
 */
const mutation = makeDomainFunction(loginInputSchema)(async (values) => {
  return values;
})


/**
 * Action that executes when form submitted
 * @param param0 
 * @returns login data
 */
export const action = async ({ request }: ActionArgs) => {
  const results = await performMutation({
    request,
    schema: loginInputSchema,
    mutation
  })

  console.log("🚀 ~ file: login.tsx:48 ~ action ~ results:", results)  

  return results
}
  
/**
 * View
 * @returns JSX
 */
export default function () {
  return (
    <div className="login-form">
      <Form 
        schema={loginInputSchema} 
        values={values}
        className="custom-form" 
      >
        {({ Field, Errors, Button, register }) => (
          <>
            <Field name="email" autoFocus />
            <Field name="password" type="password" />

            <Errors />
            <Button />
          </>
        )}
      </Form>
    </div>
  )
}

