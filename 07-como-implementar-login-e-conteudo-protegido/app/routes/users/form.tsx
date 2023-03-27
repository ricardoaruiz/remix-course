import { type ActionArgs } from "@remix-run/node"
import { makeDomainFunction } from 'domain-functions'

import { formAction } from '~/remix-forms'
import { saveUser, schema, UserForm } from "~/features/Users";
import { ErrorFeedback } from "~/components";

/**
 * 
 */
const mutation = makeDomainFunction(schema)(async (data) => {
  await saveUser(data)
})

/**
 * 
 * @param param0 
 * @returns 
 */
export const action = async ({ request }: ActionArgs) =>
  formAction({
    request,
    schema,
    mutation,
    successPath: '/users',
  })

/**
 * View
 * @returns 
 */
export default function () {
  return <UserForm />;
}

/**
 * Catch error on this route
 * @returns 
 */
export function ErrorBoundary() {
  return <ErrorFeedback />;
}