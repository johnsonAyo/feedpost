import { UseGuards, Get, Param, Controller } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtGuard } from '../guards/jwt.guard';
import { User } from '../models/user.class';
import { UserService } from '../services/user.services';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':userId')
  @ApiFoundResponse({ description: 'the resource was successfully Returned' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, Input the access Token',
  })
  @ApiNotFoundResponse({ description: 'the resource was not Found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findUserById(@Param('userId') userStringId: string): Observable<User> {
    const userId = parseInt(userStringId);
    return this.userService.findUserById(userId);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  @Get()
  @ApiFoundResponse({ description: 'the resource was successfully Created' })
  @ApiNotFoundResponse({ description: 'the resource was not Found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, Input the access Token',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findAll(): Observable<User[]> {
    return this.userService.findAllUsers();
  }
}
