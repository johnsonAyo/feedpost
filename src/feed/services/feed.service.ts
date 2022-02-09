import { Injectable , HttpException, HttpStatus, } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable , map} from "rxjs";
import { User } from "src/auth/models/user.class";
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { FeedPostEntity } from "../models/post.entity";
import { FeedPost } from "../models/post.interface";


@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>
  ) {}

  createPost(user: User, feedPost: FeedPost): Observable<FeedPost> {
    feedPost.author = user;
    return from(this.feedPostRepository.save(feedPost));
  }

  findAllPosts(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find());
  }


  findPostById(id: number): Observable<User> {
    return from(
      this.feedPostRepository.findOne(id)).pipe(
      map((feedpost: FeedPost) => {
        if (!feedpost) {
          throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        return feedpost;
      }),
    );
  }
  

  updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, feedPost));
  }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.feedPostRepository.delete(id));
  }
}
