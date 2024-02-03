import cron from 'node-cron';
import dotenv from 'dotenv'
import { findAllSubscribedUsers } from './controller'
import { ApiHandler } from './datasources/apiHandler';
import { logger } from './logger';

dotenv.config()

const apiConverterHandler = new ApiHandler({
  apiKey: process.env.API_KEY,
  converterApiKey: process.env.API_CONVERTER_HANDLER_API_KEY,
});

export const setupCronJob = () => {
  const task = cron.schedule('0 0 * * *', async () => {
    logger.info('Scheduler has started running...');
    try {
      const result = await findAllSubscribedUsers()
      const users = result.data;

      if(users.length === 0){
        logger.info('No user found to send emails')
        return;
      }

      for (const user of users) {
        try {
          await apiConverterHandler.subscribeToCryptoQuotes({
            id: user.cryptoid,
            email: user.email
          });
        } catch (error) {
          logger.info('Error sending email to ${user.email}: ', error);
          continue;
        }
      }
    } catch(error) {
      console.error('Error just occurred')
    }
  })

  task.start()
}



