import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersResponseDto } from './dto';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UsersResponseDto> {
    try {
      const newUser = await this.authService.createUser(createUserDto);
      return plainToInstance(UsersResponseDto, newUser);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'An error ocurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
