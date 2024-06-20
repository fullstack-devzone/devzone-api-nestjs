import { User } from '../entities/user.entity';
import { UserDto } from './users.dtos';

export function mapToUserDto(user: User): UserDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
