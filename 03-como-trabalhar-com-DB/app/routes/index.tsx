import { json, type LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
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
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
