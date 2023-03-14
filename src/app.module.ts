import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ConfigModule } from "@nestjs/config";
import { ReviewModule } from './review/review.module';


@Module({
  imports: [ConfigModule.forRoot(), ProductModule, ReviewModule],

})
export class AppModule {}
