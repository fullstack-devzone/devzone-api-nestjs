import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(username);
        if (user) {
            //console.log("---->", user)
            const isPasswordMatching = await bcrypt.compare(pass, user.password);
            if(isPasswordMatching) {
                const {password, ...result} = user;
                return result;
            }
        }
        return null;
    }

    async login(user: any) {
        //console.log("login: user:", user)
        const payload = { sub: user.id, username: user.name, email: user.email };
        let expiryTime = new Date();
        let milliseconds= 24 * 60 * 10 * 1000; // 1 day
        expiryTime = new Date(expiryTime.getTime() + milliseconds);
        const token = this.jwtService.sign(payload, {expiresIn: '1d'});
        //console.log("login: payload:", payload)
        //console.log("login: token:", token)
        return {
            access_token: token,
            expires_at: expiryTime,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roles: user.roles.map(role => role.name)
            }
        };
    }
}