import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService : UsersService,
        private jwtService : JwtService
    ) {}

    async signIn(email: string, passwordInput: string) {
        const user = await this.userService.findOne(email);
        if(user.password !== passwordInput) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.name, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
    
}
