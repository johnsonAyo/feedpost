import { FeedPostEntity } from "src/feed/models/post.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => FeedPostEntity, (feedPostEntity) => feedPostEntity.author)
  feedPosts: FeedPostEntity[];
}
