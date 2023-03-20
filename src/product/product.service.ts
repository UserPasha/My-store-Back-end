import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "../prisma.service";
import { ReviewService } from "../review/review.service";
import { SortType } from "./ISortType";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService, private reviewService: ReviewService) {
  }

  findBySearchTerm(searchTerm?: string) {
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

  // async findAll(type?: SortType) {
  //   const isPrice = type === 'high-to-low' || type === 'low-to-high'
  //   const isAsc = type === 'oldest' || type === 'high-to-low'
  //   const orderBy = {
  //     [isPrice ? 'price' : 'createdAt']: isAsc ? 'asc' : 'desk'
  //     //createdAt: type === 'oldest' ? 'asc' : 'desc'
  //     //price: type === 'high-to-low' ? 'desc' : 'asc'}
  //   } as any
  //   return this.prisma.product.findMany({
  //     orderBy
  //   });
  // }

  async findAll(type?: SortType) {
    const orderBy = {
      price: type === 'high-to-low' ? 'desc' : 'asc'
    } as any
    return this.prisma.product.findMany({
      orderBy
    });
  }

  // async findBySortType(typeS?: SortType) {
  //   const orderBy = typeS ? {
  //     createdAt: 'desc'
  //   }:{
  //     createdAt: 'ask'
  //   }
  //   return this.prisma.product.findMany({orderBy:
  //       {
  //         price: typeS === 'high-to-low' ? 'ask' : 'desk'
  //       }
  //     })
  // }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id
      },
      include: {
        reviews: true
      }
    });
    if (!product) throw new NotFoundException("Product not found");

    //const avrRating = await this.reviewService.getAverageRatingByProductId(id)

    //return {...product, ...avrRating};
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
