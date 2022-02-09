import { UseGuards, Get, Param, Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from '../guards/jwt.guard';
import { User } from '../models/user.class';
import { UserService } from '../services/user.services';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':userId')
  findUserById(@Param('userId') userStringId: string): Observable<User> {
    const userId = parseInt(userStringId);
    return this.userService.findUserById(userId);
  }

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAllUsers();
  }
}
