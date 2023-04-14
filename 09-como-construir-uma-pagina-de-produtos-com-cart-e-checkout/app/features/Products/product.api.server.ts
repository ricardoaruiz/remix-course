import { db } from "~/db"

export const getProducts = () => {
  return db.product.findMany()
}

export const getProduct = ({ id }: { id: number }) => {
  return db.product.findUnique({
    where: { id }
  })
}