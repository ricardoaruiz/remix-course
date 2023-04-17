import { Checkout } from "~/features";

import { type LoaderArgs, json } from "@remix-run/node"
import { getSession } from "~/session.server";
import { useLoaderData } from "@remix-run/react";
import { getTotals } from "~/features";
export async function loader({ request }: LoaderArgs) {
  
  const session = await getSession(request.headers.get('Cookie'))  
  const products = session.get('cartProducts') || []
  const totals = getTotals({products})

  return json({
    products,
    totals
  })
};

export default function () {
  const { products, totals } = useLoaderData<typeof loader>()

  return <Checkout products={products} totals={totals} />;
}