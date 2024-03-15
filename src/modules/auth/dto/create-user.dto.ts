import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @MinLength(5)
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
