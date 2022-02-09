import { UserEntity } from "src/auth/models/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

@Entity("feed_post")
export class FeedPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.feedPosts)
  author: UserEntity;
}
