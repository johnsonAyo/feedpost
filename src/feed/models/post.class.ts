import { User } from '../../auth/models/user.class';
import { ApiProperty } from '@nestjs/swagger';

export class FeedPost {
  id?: number;
  @ApiProperty({ type: 'string', description: 'body' })
  body?: string;
  createdAt?: Date;
  author?: User;
}
