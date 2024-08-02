// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

const getPrefix = () => {
  const env = process.env.NODE_ENV || 'development';
  const envPrefixMap = {
    development: 'DEV',
    test: 'TEST',
    production: 'PROD',
  };
  return envPrefixMap[env];
};

const dbConfig = () => {
  const prefix = getPrefix();
  const config = {
    database: process.env[`${prefix}_DB_NAME`] || 'test',
    username: process.env[`${prefix}_DB_USER`] || 'root',
    password: process.env[`${prefix}_DB_PASSWORD`] || 'root',
    host: process.env[`${prefix}_DB_HOST`] || 'localhost',
    port: process.env[`${prefix}_DB_PORT`] || 5432,
    dialect: process.env[`${prefix}_DB_DIALECT`] || 'postgres',
  };
  if (prefix === 'PROD') {
    config.dialectOptions = {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    };
  }

  return config;
};

module.exports = dbConfig;
