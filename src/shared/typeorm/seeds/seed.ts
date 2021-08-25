import 'reflect-metadata';
import { createConnection } from 'typeorm';

import configTypeOrm from '../../../../ormconfig';

import Movie from '../../../modules/movies/typeorm/entities/Movie';
import User from '../../../modules/users/typeorm/entities/User';
import MovieRatings from '../../../modules/movies/typeorm/entities/MovieRatings';
import { movies, users, password } from '../../../__test__/mocks/responseMock';

(async () => {
  console.log('Beginning dbseed task.');

  const conn = await createConnection(configTypeOrm);
  console.log('PG connected.');

  // Create seed data.

  const userRepo = conn.getRepository(User);
  const movieRepo = conn.getRepository(Movie);
  const movieRatingRepo = conn.getRepository(MovieRatings);

  const moviesResponse = await movieRepo.save(movies);
  const usersResponse = await userRepo.save(users);
  await userRepo.save({
    name: 'user admin',
    email: 'admin@admin.com',
    password,
    role: 'admin',
  });

  const usersArr = usersResponse.map(user => user.id);
  const moviesArr = moviesResponse.map(movie => movie.id);

  const moviesRating = [];

  for (let index = 0; index < 50; ++index) {
    const user_id = Math.floor(Math.random() * usersArr.length);
    const movie_id = Math.floor(Math.random() * moviesArr.length);
    const value = Math.round(Math.random() * 4);
    moviesRating.push({
      userId: usersArr[user_id],
      movieId: moviesArr[movie_id],
      value,
    });
  }

  const movieRatings = await movieRatingRepo.save(moviesRating);

  console.log(`Users saved. id = ${usersResponse}`);
  console.log(`Movies saved. id = ${moviesResponse}`);
  console.log(`Ratins saved. id = ${movieRatings}`);

  // Close connection
  await conn.close();
  console.log('PG connection closed.');

  console.log('Finished dbseed task.');
})();
