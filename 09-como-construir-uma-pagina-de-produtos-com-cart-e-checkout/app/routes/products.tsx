import { type Product } from "@prisma/client";
import { type LoaderArgs, type ActionArgs, json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";

import { Cart } from "~/features/Cart";
import { ProductList, getProduct, getProducts } from "~/features/Products";
import { commitSession, getSession } from "~/session.server";

const CART_PRODUCTS = 'cartProducts'

/**
 * 
 * @param param0 
 * @returns 
 */
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as { productId: string }
  
  const product = await getProduct({id: Number(data.productId)})

  const session = await getSession(request.headers.get('Cookie'))
  const currentSessionProducts = session.get(CART_PRODUCTS) ?? []
  session.set(CART_PRODUCTS, [ ...currentSessionProducts, product ])

  return redirect('/products', {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};

/**
 * 
 * @param param0 
 * @returns 
 */
export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const products = await getProducts()

  const sessionProducts: Product[] = session.get(CART_PRODUCTS) ?? []
  console.log('sessionProducts', sessionProducts)
  const cartProducts = sessionProducts ? [ ...sessionProducts ]  : []

  return json({ products, cartProducts })
};

export default function () {
  const { products, cartProducts } = useLoaderData<typeof loader>()

  return (
    <>
      <Cart products={cartProducts} />
      <ProductList products={products} />
    </>
  );
}