import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from '../users/users.dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(username);
    if (user) {
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      if (isPasswordMatching) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any): Promise<LoginResponse> {
    const payload = {
      sub: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const milliseconds = 24 * 60 * 10 * 1000; // 1 day
    const expiryTime = new Date(new Date().getTime() + milliseconds);
    const token = this.jwtService.sign(payload, { expiresIn: '1d' });

    return {
      access_token: token,
      expires_at: expiryTime,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
