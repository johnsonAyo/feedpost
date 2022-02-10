import { FeedPost } from 'src/feed/models/post.class';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  id?: number;
  @ApiProperty({ type: 'string', description: 'firstName' })
  firstName?: string;
  @ApiProperty({ type: 'string', description: 'lasttName' })
  lastName?: string;
  @IsEmail()
  @ApiProperty({ type: 'string', description: 'email' })
  email?: string;
  @IsString()
  @ApiProperty({ type: 'string', description: 'password' })
  password?: string;

  posts?: FeedPost[];
}

export class Login {
  @IsEmail()
  @ApiProperty({ type: 'string', description: 'email' })
  email?: string;
  @IsString()
  @ApiProperty({ type: 'string', description: 'password' })
  password?: string;
}
