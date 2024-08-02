import { Sequelize } from 'sequelize';
import dbConfig from '../config/db_config';
import { logger } from '../utils';
import Modals from './models';

export * from './models';

interface DatabaseConfigInterface {
  database: string;
  username: string;
  password: string;
  host: string;
  port: string;
  dialect: string;
  secret: string;
  dialectOptions?: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

const { username, database, password, host, dialectOptions } =
  dbConfig() as DatabaseConfigInterface;
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  logging: (msg: string) => logger.debug(msg.replace(/[\n\t\r]/g, '')),

  ...(dialectOptions ? { dialectOptions } : {}),
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    logger.error('Unable to connect to the database:', err);
  });

const modals = Modals(sequelize);

Object.values(modals).forEach(modal => {
  // eslint-disable-next-line no-prototype-builtins -- associate is a function
  if (modal.associate) {
    // eslint-disable-next-line no-prototype-builtins -- associate is a function
    modal.associate(modals);
  }
});

const Database = { sequelize, ...modals };
export default Database;
