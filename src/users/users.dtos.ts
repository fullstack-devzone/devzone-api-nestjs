import { IsNotEmpty, IsString } from 'class-validator';

export interface UserDto {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  expires_at: Date;
  user: UserDto;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
