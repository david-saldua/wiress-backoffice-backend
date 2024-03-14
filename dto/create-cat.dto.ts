import { IsString, IsInt, Min, Max, Length } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsInt()
  @Min(0)
  @Max(30)
  age: number;

  @IsString()
  @Length(1, 50)
  breed: string;
}
