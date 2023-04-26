import { IsString, IsEmail } from 'class-validator';

export class ExistingUserDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
