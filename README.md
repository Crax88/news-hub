# news-hub

Test task - create a fullstack CRUD news app.

[Preview](https://new-hub-app.onrender.com)

## Techologies used

Frontend app is build using:

- [Vite](https://vitejs.dev/)
- (Typescript)[https://www.typescriptlang.org/]
- (React)[https://react.dev/]
- Also it tryies to follow (Feature Sliced Design)[https://feature-sliced.design]

Backend is build using:

- (Typescript)[https://www.typescriptlang.org/]
- (ExpressJS)[https://expressjs.com/]
- (Inversify)[https://inversify.io/]
- (Prisma)[https://www.prisma.io/]
- It relies on dependency injection pattern.

## Development start

To start project follow this steps:

1. install [Docker](https://www.docker.com/) and [Docker-compose](https://docs.docker.com/compose/)
2. Clone the repository
3. `cd` into project directory
4. Inside project directory run `cp .env.sample .env`
5. Inside project directory run `docker-compose up`
6. To remove things related to Docker run `docker-compose down --rmi local -v` inside project directory

## Todos

- Fix logout issue
- Add file uploads
- Add publish cron
- Add sorting and filtering news
