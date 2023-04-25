import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDocument } from './product.schema';

// Represent: localhost:3000/product
@Controller('product')
export class ProductController {
  public constructor(private productService: ProductService) {}

  @Post()
  public createProduct(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ): Promise<ProductDocument> {
    return this.productService.create(name, price, description);
  }

  @Get()
  public findAllProducts(): Promise<ProductDocument[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  public findProduct(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.findById(id);
  }

  @Patch(':id')
  public updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
  ): Promise<ProductDocument> {
    return this.productService.update(id, name, price, description);
  }

  @Delete(':id')
  public deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
