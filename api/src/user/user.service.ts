import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { UserDetails } from './user-details.interface';

@Injectable()
export class UserService {
  // to inject a Mongoose model for the 'User' schema into the UserService
  // it enables you to access the Mongoose model for a given schema in your
  // service
  public constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  // By injecting the userModel in the constructor, you can use it within the
  // UserService class to interact with the User collection in the MongoDB database,
  // such as creating, reading, updating, or deleting User documents.

  public getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  // Find user by email
  public async findByEmail(email: string): Promise<UserDocument | null> {
    // Query Database to find the user based on the email
    return await this.userModel.findOne({ email }).exec();
  }

  // Find user by id
  public async findById(id: string): Promise<UserDetails | null> {
    // Query Database to find the user based on the id
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this.getUserDetails(user);
  }

  public async create(
    name: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }
}
