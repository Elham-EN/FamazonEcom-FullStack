import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDocument } from './product.schema';
// Document Transfer Objects
import { CreateProductDto } from './dtos/create-product.dto';
import { GetAllProductsDto } from './dtos/get-all-products.dto';
import { GetProductById } from './dtos/get-product-id.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

// Represent: localhost:3000/product
@ApiTags('product')
@Controller('product')
export class ProductController {
  public constructor(private productService: ProductService) {}

  // Create a new product
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  public createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDocument> {
    const { name, price, description } = createProductDto;
    return this.productService.create(name, price, description);
  }

  // Get all products
  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The products have been successfully retrieved.',
    type: [GetAllProductsDto],
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Failed to retrieve products.',
  })
  public findAllProducts(): Promise<ProductDocument[]> {
    return this.productService.findAll();
  }

  // Get Product by it's id
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The product has been successfully retrieved.',
    type: GetProductById,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found.',
  })
  public findProduct(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.findById(id);
  }

  // Update Product's details
  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({
    description: 'Product update data',
    schema: {
      type: 'object',
      required: [], // empty array means no properties are required
      properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The product has been successfully updated.',
    type: UpdateProductDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  public updateProduct(
    @Param('id') id: string,
    @Body() updateproductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    const { name, price, description } = updateproductDto;
    return this.productService.update(id, name, price, description);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found.',
  })
  public deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
