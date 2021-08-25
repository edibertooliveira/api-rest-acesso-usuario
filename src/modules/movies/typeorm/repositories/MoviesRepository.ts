import { EntityRepository, Repository } from 'typeorm';
import Movie from '../entities/Movie';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  public async findByName(title: string): Promise<Movie | undefined> {
    return await this.findOne({
      where: {
        title,
      },
    });
  }
}
