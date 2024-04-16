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
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthService.name);
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
      this.logger.error(
        'An error occurred during user registration',
        error.stack,
      );

      throw new HttpException(
        'An error ocurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
