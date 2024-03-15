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
import { UsersDocument } from './users.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<UsersDocument> {
    try {
      const newUser = await this.authService.createUser(createUserDto);
      return newUser;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'An error ocurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
