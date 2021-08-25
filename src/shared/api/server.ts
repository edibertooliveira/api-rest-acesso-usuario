import 'dotenv/config';
import 'reflect-metadata';
import server from './app';

server.listen(process.env.APP_PORT, () => {
  console.log(
    `\nServer is running on: ${process.env.APP_API_URL}
    \nDocumentation: ${process.env.APP_API_URL}/docs`,
  );
  console.log(``);
});
