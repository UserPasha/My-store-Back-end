import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
import { IProductPart, products } from "./products.data";

const toSlug = (name: string) => {
  return name.replace(/[^a-z0-9]/gi, "-").toLowerCase();
};

const prisma = new PrismaClient();

const fakerProduct = (product: IProductPart): Prisma.ProductCreateInput => ({
  name: product.name,
  images: product.images,
  description: faker.commerce.productDescription(),
  price: faker.datatype.number({ min: 2, max: 30 }),
  slug: toSlug(product.name),
  reviews: {
    createMany: {
      data: Array.from({ length: faker.datatype.number({ min: 5, max: 10 }) }).map(() => ({
        text: faker.lorem.paragraph(faker.datatype.number({ min: 40, max: 100 })),
        rating: faker.datatype.number({ min: 1, max: 5 })
      }))
    }
  }

});

async function main() {
  dotenv.config();
  console.log("Seeding...");

  await Promise.all(products.map(async product => {
    await prisma.product.create({ data: fakerProduct(product) });
  }));


};


main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });