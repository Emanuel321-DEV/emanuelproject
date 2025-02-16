/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    const passwordsMatched = await bcrypt.compare(pass, user.password);
    if (user && passwordsMatched) {
      user.password = null;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      username: user.username, 
      sub: user._id,
      isAdmin: user.isAdmin 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
