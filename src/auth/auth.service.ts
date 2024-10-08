import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // Your users service
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService, // Inject UserService
        private readonly jwtService: JwtService // Inject JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            return user;
        }
        return null;
    }

    async validateToken(token: string): Promise<any> {
        try {
            const decoded = this.jwtService.decode(token);
            return decoded; // You can return the decoded payload if needed
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
    async login(user: any) {
        const payload = { name: user.name, email: user.email, id: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
