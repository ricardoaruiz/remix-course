import { UserForm } from "~/components/UsersForm";

import { type ActionArgs } from "@remix-run/node"
import { z } from 'zod'
import { makeDomainFunction } from 'domain-functions'
import { formAction } from '~/form-action.server'
import { db } from "~/db.server";

/**
 * 
 */
const schema = z.object({
  name: z.string().min(1, { message: 'Provide a name'}).trim(),
  email: z.string().min(1, { message: 'Provide an e-mail' }).email({ message: 'Provide a valid e-mail' }).trim(),
  city: z.string().min(1, { message: 'Provide a city' }).trim(),
  state: z.string().min(1, { message: 'Provide a state' }).trim(),
})

/**
 * 
 */
const mutation = makeDomainFunction(schema)(async (data) => {
  await db.user.create({data})
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
  return <UserForm schema={schema}/>;
}

/**
 * Catch error on this route
 * @returns 
 */
export function ErrorBoundary() {
  return (
    <div className="bg-red-100 border border-red-500 p-12 text-red-500 font-bold text-2xl">
      Something went wrong
    </div>
  );
}