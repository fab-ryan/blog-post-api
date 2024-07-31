import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: number;
  secret: string;
}

const config: IConfig = {
  port: parseInt(process.env.PORT ?? '3000', 10),
  secret: process.env.SECRET || 'secret',
};

export { config };
