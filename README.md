[![Coverage Status](https://coveralls.io/repos/github/fab-ryan/blog-post-api/badge.svg?branch=main)](https://coveralls.io/github/fab-ryan/blog-post-api?branch=main)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/fab-ryan/blog-post-api/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/fab-ryan/blog-post-api/tree/main)
![ts](https://flat.badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Dotenv](https://img.shields.io/badge/Dotenv-000000?style=for-the-badge&logo=dotenv&logoColor=white)
# Posts API  Application with POSTGRES and Express
This application is for Posting a blog, be able to read ablog and even managment of users are implemented

## Features
 - TypeScript for type safety and better development experience.
 - Express for handling HTTP requests.
 - PostgreSQL as the relational database.
 - Multer for handling file uploads.
 - Jest for running unit tests.
 - Dotenv for managing environment variables.
  
## Project Structure

```
src\
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--database\       # Database connection and model definitions
    |--Modals\      # Database models
    |--Migrations\  # Database migrations
    |--Seeders\     # Database seeders
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--tes
 |--app.ts          # Express app
 |--index.ts        # App entry point
 |--tests\          # Unit tests
|── .env
|── .env.example
├── tsconfig.json
├── package.json
└── README.md
```


## Installation and Setup Instructions
- Clone the repository using the following command:
```bash 
git clone 
```
- Install the dependencies using the following command:
```bash
npm install
```
- Create a `.env` file in the root directory and add the following environment variables:
```bash
NODE_ENV=
PORT=
PORT=5500
SECRET_KEY=
DEV_DB_USER=
DEV_DB_PASSWORD=
DEV_DB_NAME=
DEV_DB_HOST=
TEST_DB_USER=
TEST_DB_PASSWORD=
TEST_DB_NAME=
TEST_DB_HOST=
PROD_DB_USER=
PROD_DB_PASSWORD=
PROD_DB_NAME=
PROD_DB_HOST=
```
- Create a PostgreSQL database and add the database URL to the `.env` file.
- Run the database migrations using the following command:
```bash
npm run migrate
```
- Seed the database using the following command:
```bash
npm run seed
```

- Start the application using the following command:
```bash
npm run dev
```
- Run the tests using the following command:
```bash
npm run test
```

## API Endpoints
The API will be available at `http://localhost:5500/api/`.
The swagger documentation will be available at `http://localhost:5500/api-docs`.


## Done By 
- [fab-ryan](https://github.com/fab-ryan)
