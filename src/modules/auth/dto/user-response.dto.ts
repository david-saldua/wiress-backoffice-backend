import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UsersResponseDto {
  @Expose()
  username: string;

  @Expose()
  password: string;

  @Expose()
  email: string;
}
