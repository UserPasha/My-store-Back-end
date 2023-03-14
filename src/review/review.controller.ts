import { Controller, Get, Param, Query } from "@nestjs/common";
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Get()
  findAll(@Query('searchTerm') searchTerm?: string) {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.reviewService.findById(+id);
  }
}
