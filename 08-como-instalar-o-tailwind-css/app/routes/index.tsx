import { redirect } from "@remix-run/node"

/**
 * Loader function (server side)
 * @param param0 
 * @returns Users
 */
export async function loader() {
  return redirect('/users')
};

