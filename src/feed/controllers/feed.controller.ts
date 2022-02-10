import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Request,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { FeedPost } from '../models/post.class';
import { FeedService } from '../services/feed.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('feeds')
@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  @ApiCreatedResponse({ description: 'the resource was successfully Created' })
  @ApiForbiddenResponse({ description: 'Bad Request' })
  create(@Body() feedPost: FeedPost, @Request() req): Observable<FeedPost> {
    return this.feedService.createPost(req.user, feedPost);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiFoundResponse({ description: 'the resource was successfully Created' })
  @ApiNotFoundResponse({ description: 'the resource was not Found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, Input the access Token',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findAll(): Observable<FeedPost[]> {
    return this.feedService.findAllPosts();
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiFoundResponse({ description: 'the resource was successfully Created' })
  @ApiNotFoundResponse({ description: 'the resource was not Found' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized, Input the access Token',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get(':id')
  findPostById(@Param('id') postStringId: string): Observable<FeedPost> {
    const id = parseInt(postStringId);
    return this.feedService.findPostById(id);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'the resource was successfully updated' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedPost: FeedPost,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'the resource was successfully deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
