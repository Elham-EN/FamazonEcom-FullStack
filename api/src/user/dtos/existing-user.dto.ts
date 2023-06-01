import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class ExistingUserDTO {
  @ApiProperty({ description: 'Register', example: 'tom@email.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'Register', example: 'abcd1234' })
  @IsString()
  password: string;
}
