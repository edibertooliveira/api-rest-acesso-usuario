import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity('ratings')
export default class MovieRatings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'movie_id' })
  movieId: string;

  @Column()
  value: number;

  @UpdateDateColumn()
  updated_at: Date;
}
