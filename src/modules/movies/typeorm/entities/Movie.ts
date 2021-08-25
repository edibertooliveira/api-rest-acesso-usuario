import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('movies')
export default class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  authors: string;

  @Column()
  directors: string;

  @Column()
  image: string;

  @Column()
  year: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image_url' })
  getAvatarURL(): string | null {
    if (!this.image) {
      return null;
    }

    return `${process.env.APP_API_URL}/file/${this.image}`;
  }
}
