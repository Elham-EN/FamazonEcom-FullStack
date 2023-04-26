import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  // DTOs can be shared across different modules in a NestJS application
  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
    const { name, email, password } = user;

    // Check if there is an existing user in the database
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) return 'Email taken!';

    const hashedPassword = await this.hashPassword(password);

    // Create new user and save it to the database
    const newUser = await this.userService.create(name, email, hashedPassword);

    return this.userService.getUserDetails(newUser);
  }
}
