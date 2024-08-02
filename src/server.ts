import { app, port } from './index';
import { logger } from './utils';

app.listen(port, () => {
  logger.info(`Server is running on port of ${port} 🚀`);
});
