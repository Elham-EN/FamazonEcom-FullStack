import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { NewUserDTO, NewUserResponseDto } from '../user/dtos/new-user.dto';
import { UserDetails } from '../user/user-details.interface';
import { ExistingUserDTO } from '../user/dtos/existing-user.dto';

class VerifyJwtDto {
  @ApiProperty({
    description: 'The JWT to verify',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIi' +
      'wibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF' +
      '2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  jwt: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: NewUserDTO,
    description: 'Create new user with name, email, and password',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
    type: NewUserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists.',
  })
  register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) // override default status code
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({
    type: ExistingUserDTO,
    description: 'User credentials (email and password)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged in successfully',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  login(@Body() user: ExistingUserDTO): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }

  // Verify Json Web Token in order to access the protected routes
  @Post('verify-jwt')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify JWT to access protected routes' })
  @ApiBody({
    type: VerifyJwtDto,
    description: 'verify jwt token to access protected routes',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'JWT verified successfully, Return token expiration timestamp.',
    schema: {
      type: 'object',
      properties: {
        exp: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid JWT.',
  })
  // expecting jwt from the incoming request from clinet app
  verifyJwt(@Body() payload: { jwt: string }) {
    return this.authService.verifyJwt(payload.jwt);
  }
}
