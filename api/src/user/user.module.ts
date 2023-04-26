import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NewUserDTO } from './dtos/new-user.dto';
import { ExistingUserDTO } from './dtos/existing-user.dto';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  // makes it available for injection in other modules that import the User module
  exports: [UserService],
})
export class UserModule {}
