import { PrismaClient } from "@prisma/client"
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()
const password = '123456'

const seed = async () => {
  await db.user.deleteMany()

  const quantity = 12
  Array.from({ length: quantity }).forEach(async () => {
    await db.user.create({
      data: {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        password: await bcrypt.hash(password, 10),
        email: faker.internet.email(),
        city: faker.address.city(),
        state: faker.address.state()
      }
    })
  })

}

seed().finally(() => db.$disconnect())