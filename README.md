# Node.js TypeScript CRUD Application with POSTGRES
This project is a Node.js application written in TypeScript, implementing CRUD (Create, Read, Update, Delete) operations for User and Post entities. The application uses Express as the web framework, PostgreSQL as the database, and includes unit tests to ensure functionality.

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
- [fab-ryan]
