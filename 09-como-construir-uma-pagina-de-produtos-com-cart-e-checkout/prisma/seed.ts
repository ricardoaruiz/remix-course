import { PrismaClient } from "@prisma/client"
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()
const password = '123456'

const generateUsers = async () => {
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

const generateProducts = async () => {
  await db.product.deleteMany();

  const quantity = 12;

  Array.from(Array(quantity).keys()).forEach(async () => {
    await db.product.create({
      data: {
        name: faker.commerce.productName(),
        color: `${faker.color.human()} and ${faker.color.human()}`,
        href: faker.internet.url(),
        imageSrc: faker.image.cats(),
        imageAlt: faker.lorem.sentence(),
        price: faker.commerce.price(),
      },
    });
  });
}

const seed = async () => {
  // await generateUsers()
  await generateProducts()
}

seed().finally(() => db.$disconnect())