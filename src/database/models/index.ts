import { Sequelize } from 'sequelize';

import UserModal from './user';
import PostModal from './post';

export * from './user';
export * from './post';

export interface Models {
  User: typeof UserModal;
  Post: typeof PostModal;
}

const Modals = (sequelize: Sequelize) => {
  const models = {
    User: UserModal(sequelize),
    Post: PostModal(sequelize),
  };

  return models;
};

export default Modals;
