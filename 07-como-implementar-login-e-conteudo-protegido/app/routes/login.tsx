import type { ActionArgs, LinksFunction } from "@remix-run/node";

import { makeDomainFunction } from 'domain-functions'
import { performMutation } from "remix-forms";

import { Form } from "~/remix-forms"
import { createSession } from "~/session.server";

import { login, loginInputSchema, type LoginInput } from "~/features/Auth";

import formsStyles from '~/styles/forms.css'

/**
 * Form initial values
 */
const values: LoginInput = {
  email: 'Morris41@hotmail.com',
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
  return login(values);
})


/**
 * Action that executes when form submitted
 * @param param0 
 * @returns login data
 */
export const action = async ({ request }: ActionArgs) => {

  //https://remix-forms.seasoned.cc/examples/actions/custom-response
  const result = await performMutation({
    request,
    schema: loginInputSchema,
    mutation
  })

  // If has validation errors, return result to render on view
  if (!result.success) {
    return result
  }

  // Create new session
  return createSession(request, String(result.data.id))
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
        {({ Field, Errors, Button }) => (
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