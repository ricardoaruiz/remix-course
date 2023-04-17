import { type LoaderArgs, redirect } from "@remix-run/node"
import { commitSession, getSession } from "~/session.server"

const CART_PRODUCTS = 'cartProducts'

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  session.unset(CART_PRODUCTS)
  
  return redirect('/products', {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};