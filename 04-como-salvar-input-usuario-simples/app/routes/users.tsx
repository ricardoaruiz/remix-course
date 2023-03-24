import { json, type LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { UsersTable } from "~/components/UsersTable"
import { db } from '../db.server'

/**
 * Loader function (server side)
 * @param param0 
 * @returns Users
 */
export async function loader({ request }: LoaderArgs) {
  const users = await db.user.findMany()  
  return json(users)
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
