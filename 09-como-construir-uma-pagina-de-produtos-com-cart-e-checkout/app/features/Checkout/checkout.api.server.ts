import { type Product } from "@prisma/client";

export type Totals = {
  total: number;
  taxes: number;
  subTotal: number;
}

export function getTotals({ products }: { products: Product[] }): Totals {
  const subTotal = products.reduce((acc, product) => {
    return acc + Number(product.price);
  }, 0);

  const taxes = subTotal * 0.1;

  const total = subTotal + taxes;

  return { subTotal, taxes, total };
}
