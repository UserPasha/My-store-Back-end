import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {
  }

  findAll(searchTerm?: string) {
    return this.prisma.product.findMany(searchTerm ? {
      where: {
        OR: [
          {
            name: {
              contains: searchTerm
            }
          },
          {
            description: {
              contains: searchTerm
            }
          }
        ]
      }
    } : undefined);
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id
      }
    });
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        slug
      }
    });
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }

   findSimilar(currentProductId: number) {
    return this.prisma.product.findMany({
      where: {
        id: {
          not: currentProductId
        }
      }
    });
  }

  // create(id: number, createProductDto: CreateProductDto) {

  //             rut.

  //   return 'This action adds a new product';
  // }
  //
  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
