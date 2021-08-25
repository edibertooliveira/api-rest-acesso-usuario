import { getManager } from 'typeorm';
import Movie from '../typeorm/entities/Movie';

interface IPaginateMovie {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Movie[];
}

export default class ListMoviesService {
  public async execute(): Promise<IPaginateMovie> {
    const entityManager = getManager();
    return await entityManager.query(
      `
      SELECT *, (SELECT ROUND(AVG(r.value)) as rating from ratings as r where r.movie_id = m.id) as rating FROM movies as m
    `,
    );
  }
}
