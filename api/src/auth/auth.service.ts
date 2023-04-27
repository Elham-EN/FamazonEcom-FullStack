import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from '../user/dtos/new-user.dto';
import { UserDetails } from '../user/user-details.interface';
import { ExistingUserDTO } from '../user/dtos/existing-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    // The cost factor determines the computational complexity of the hashing
    // process, making it more time-consuming and resource-intensive to crack
    // the hashed password through brute force or dictionary attacks
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

  // Check if the plain-text password matches the hashedPassword
  private async doesPassowordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Before we login, we need to validate the user
  private async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    // Query the database to find the user based on the provided email
    const user = await this.userService.findByEmail(email);
    // checks whether the user variable is truthy or falsy. The double negation
    // operator !! converts user to a boolean value. If user is not null, undefined,
    // or any other falsy value, doesUserExist will be true, indicating that a user
    // exists. If user is falsy, doesUserExist will be false, meaning the user does
    // not exist
    const doesUserExist = !!user;
    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPassowordMatch(
      password,
      user.password,
    );
    if (!doesPasswordMatch) return null;

    return this.userService.getUserDetails(user);
  }

  async login(
    existingUser: ExistingUserDTO,
  ): Promise<{ token: string } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);
    if (!user) return null;
    // generate a JWT with the user information as its payload and return
    // the token to the client. The client can then use this token for
    // authentication and authorization in subsequent requests to the server
    const jwt = await this.jwtService.signAsync({ user });
    return { token: jwt };
  }
}
