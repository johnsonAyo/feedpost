import { Body, Controller, Post } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Login, User } from '../models/user.class';
import { AuthService } from '../services/auth.service';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'Registered Successfully' })
  @ApiForbiddenResponse({ description: 'Bad Request' })
  register(@Body() user: User): Observable<User> {
    return this.authService.registerAccount(user);
  }
  @Post('login')
  @ApiOkResponse({ description: 'logged in  Successfully' })
  @ApiForbiddenResponse({ description: 'Bad Request' })
  login(@Body() user: Login): Observable<{ token: string }> {
    return this.authService
      .login(user)
      .pipe(map((jwt: string) => ({ token: jwt })));
  }
}
