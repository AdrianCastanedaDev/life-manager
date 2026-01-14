import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/application/users.service';
import { comparePasswords } from '../../../common/utils/hash.util';
import { JwtPayload, TokenResponse } from '../domain/auth.types';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await comparePasswords(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password: _, ...result } = user;
        return result;
    }

    async login(user: { id: string; email: string }): Promise<TokenResponse> {
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
        };

        return {
            accessToken: this.jwtService.sign(payload),
            expiresIn: 86400, // 24 hours
        };
    }

    async register(email: string, password: string, name: string) {
        const user = await this.usersService.create({ email, password, name });
        return this.login(user);
    }
}
