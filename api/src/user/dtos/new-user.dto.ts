/**
 * In NestJS, DTOs (Data Transfer Objects) are used to define the structure
 * of the data that will be sent over the network, typically between the
 * client and the server. They provide a way to enforce a schema for incoming
 * and outgoing data, enhancing the maintainability, readability, and validation
 * of the data within the application.
 */

import { IsString, IsEmail } from 'class-validator';

export class NewUserDTO {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
