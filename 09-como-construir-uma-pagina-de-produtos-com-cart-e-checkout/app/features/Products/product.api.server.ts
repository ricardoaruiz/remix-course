import { db } from "~/db"

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const getProducts = () => {
  return db.product.findMany()
}

export const getProduct = ({ id }: { id: number }) => {
  return delay(0).then(() =>
    db.product.findUnique({
      where: { id }
    })
  )
}