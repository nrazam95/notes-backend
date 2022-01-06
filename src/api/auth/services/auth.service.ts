import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordHelper } from '../password/password.helper';
import { UsersService } from '../../users/services/users.service';
import { from, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = lastValueFrom(this.usersService.findByUsername(username));
      const confirmedPassword = await this.passwordHelper.comparePassword(
        (
          await user
        ).password,
        password,
      );
      if (confirmedPassword) {
        return user;
      }
    } catch (error) {
      throw new Error('Invalid username or password');
    }
  }

  async login(user: any) {
    const payload = { username: user.username, password: user.password };
    const getUser = lastValueFrom(
      this.usersService.findByUsername(payload.username),
    );
    const confirmedPassword = await this.passwordHelper.comparePassword(
      (
        await getUser
      ).password,
      user.password,
    );

    if (confirmedPassword) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }

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
