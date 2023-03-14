import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.review.findMany({
      orderBy: {
        //createdAt: 'desc'
        //faker-js
      }
    });
  }

  async findById(id: number) {
    const review = await this.prisma.review.findUnique({
      where: {
        id
      }
    });
    if (!review) throw new NotFoundException("Review not found");
    return review;
  }
}
