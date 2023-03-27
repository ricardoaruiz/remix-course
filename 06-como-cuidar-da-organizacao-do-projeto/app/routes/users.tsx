import { json, type LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { UsersTable } from "~/features/Users"
import { ErrorFeedback } from "~/components"
import { getUsers } from "~/features/Users/users.api"

/**
 * Loader function (server side)
 * @param param0 
 * @returns Users
 */
export async function loader({ request }: LoaderArgs) {
  return json(await getUsers())
};

/**
 * Default function (client side)
 * @returns JSX
 */
export default function Index() {
  const users = useLoaderData<typeof loader>()

  return (
    <>
      <UsersTable users={users} />
    </>
  );
}

/**
 * Catch error on this route
 * @returns 
 */
export function ErrorBoundary() {
  // Enviar o erro para um serviço externos. Ex: Sentry
  return <ErrorFeedback />;
}