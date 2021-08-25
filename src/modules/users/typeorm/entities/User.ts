import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import MovieRatings from '../../../movies/typeorm/entities/MovieRatings';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Column()
  role: string;

  @Column()
  @Exclude()
  exclude: boolean;

  @OneToMany(() => MovieRatings, movieRatings => movieRatings.movieId)
  rating: MovieRatings[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarURL(): string | null {
    if (!this.avatar) {
      return null;
    }

    return `${process.env.APP_API_URL}/file/${this.avatar}`;
  }
}
