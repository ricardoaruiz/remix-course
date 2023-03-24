import { PrismaClient } from "@prisma/client"
import { faker } from '@faker-js/faker'

const db = new PrismaClient()

const seed = async () => {
  await db.user.deleteMany()

  const quantity = 12
  Array.from({ length: quantity }).forEach(async () => {
    await db.user.create({
      data: {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        city: faker.address.city(),
        state: faker.address.state()
      }
    })
  })

}

seed().finally(() => db.$disconnect())