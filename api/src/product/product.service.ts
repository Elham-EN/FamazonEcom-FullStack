import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  public constructor(
    //  inject a Product model into the ProductService
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  public async create(
    name: string,
    price: number,
    description: string,
  ): Promise<ProductDocument> {
    const newProduct = new this.productModel({ name, price, description });
    return await newProduct.save();
  }

  public async findAll(): Promise<ProductDocument[]> {
    return await this.productModel.find().exec();
  }

  public async findById(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  public async update(
    id: string,
    newName: string,
    newPrice: number,
    newDescription: string,
  ): Promise<ProductDocument> {
    const existingProduct = await this.findById(id);
    existingProduct.name = newName ?? existingProduct.name;
    existingProduct.price = newPrice ?? existingProduct.price;
    existingProduct.description = newDescription ?? existingProduct.description;
    return existingProduct.save();
  }

  public async delete(id: string) {
    return this.productModel.deleteOne({ _id: id }).exec();
  }
}
