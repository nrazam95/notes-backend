import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { GetUser } from '../strategies/get-user.decorator';
import { UserIsUserGuard } from '../strategies/UserIsUser.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  register(@Req() req: Request): Observable<any> {
    const payload = {
      username: req.query.username,
      password: req.query.password,
      email: req.query.email,
    };
    return from(this.authService.register(payload));
  }

  @Post('signin')
  login(@Req() req: Request): Observable<any> {
    const payload = {
      username: req.query.username,
      password: req.query.password,
    };
    return from(this.authService.login(payload));
  }

  @Post('test')
  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  test(@GetUser() req: any) {
    return req;
  }
}
