/**
 * In NestJS, DTOs (Data Transfer Objects) are used to define the structure
 * of the data that will be sent over the network, typically between the
 * client and the server. They provide a way to enforce a schema for incoming
 * and outgoing data, enhancing the maintainability, readability, and validation
 * of the data within the application.
 */

import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewUserDTO {
  @ApiProperty({ description: 'Register', example: 'Tom' })
  @IsString()
  name: string;
  @ApiProperty({ description: 'Register', example: 'tom@email.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'Register', example: 'abcd1234' })
  @IsString()
  password: string;
}

export class NewUserResponseDto {
  @ApiProperty({ description: 'Register', example: '64688d42a7426b23484f92b2' })
  id: string;
  @ApiProperty({ description: 'Register', example: 'Tom' })
  name: string;
  @ApiProperty({ description: 'Register', example: 'tom@email.com' })
  email: string;
}
