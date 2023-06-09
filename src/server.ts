import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('🛢 Database is successfully connected');

    server = app.listen(config.port, () => {
      logger.info(`Application is listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect database', err);
  }

  //gracefull error
  process.on('unhandledRejection', error => {
    console.log(
      'Unhandled Rejection is detected, we are closing our server...........'
    );
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
boostrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
