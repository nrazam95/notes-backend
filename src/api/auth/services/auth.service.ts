import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordHelper } from '../password/password.helper';
import { UsersService } from '../../users/services/users.service';
import { from } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Validate user credentials
    if (username !== 'admin' || password !== 'admin') {
      return null;
    }

    // Return user object
    return { username };
  }

  /* async login(user: any) {
    const payload = { username: user.username, password: user.password };
    const confirmedPassword = await this.passwordHelper.comparePassword(
        user.password,

    )
  } */

  async register(user: any) {
    const payload = {
      username: user.username,
      password: user.password,
      email: user.email,
    };

    const hashedPassword = await this.passwordHelper.hashPassword(
      payload.password,
    );

    payload.password = hashedPassword;

    const createUser = from(this.usersService.createUser(payload));
    return {
      ...createUser,
      access_token: this.jwtService.sign(payload),
    };
  }
}
