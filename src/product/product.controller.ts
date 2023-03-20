import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SortType } from "./ISortType";

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  @Get('search')
  findBySearchTerm(@Query('searchTerm') searchTerm?: string) {
    return this.productService.findBySearchTerm(searchTerm);
  }

  @Get()
  findBySortType(@Query('type') sortType?: SortType) {
    return this.productService.findAll(sortType);
  }

  // @Get()
  // findBySortType(@Query('sortType') type?: SortType) {
  //   return this.productService.findBySortType(type);
  // }

  @Get('/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug);
  }

  @Get('/similar/:currentProductId')
  findSimilar(@Param('currentProductId') currentProductId: number) {
    return this.productService.findSimilar(+currentProductId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(+id);
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
