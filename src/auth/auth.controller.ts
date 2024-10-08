import { Controller, Post, Body, UnauthorizedException, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        const { email, password } = body;
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Get('validate')
    async validateToken(@Req() request: Request) {
        const token = request.headers['authorization']?.replace('Bearer ', ''); // Remove 'Bearer ' prefix
        const result = await this.authService.validateToken(token);
        return result
    }
}
