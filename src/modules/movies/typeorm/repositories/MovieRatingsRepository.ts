import { EntityRepository, Repository } from 'typeorm';
import MovieRatings from '../entities/MovieRatings';

@EntityRepository(MovieRatings)
export class MovieRatingsRepository extends Repository<MovieRatings> {}
