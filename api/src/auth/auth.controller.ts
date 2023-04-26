import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';

@Controller('auth')
export class AuthController {
  public constructor(private authService: AuthService) {}

  @Post('register')
  public register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
    return this.authService.register(user);
  }
}
