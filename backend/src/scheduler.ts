import cron from 'node-cron';
import dotenv from 'dotenv'
import { findAllSubscribedUsers } from './controller'
import { ApiHandler } from './datasources/apiHandler';
import { logger } from './logger';

dotenv.config()

type Users = {
  cryptoid: number;
  email: string;
}[]

const apiConverterHandler = new ApiHandler({
  apiKey: process.env.API_KEY,
  converterApiKey: process.env.API_CONVERTER_HANDLER_API_KEY,
});

const processBatch = async () => {
  const batchSize = 20;
  try {
    const users = await findAllSubscribedUsers()

  for (let i = 0; i < users.length; i += batchSize){
    try {
      const batch = users.slice(i, i += batchSize)
      await sendEmailInBatches(batch)
    } catch (error) {
      logger.info('Error sending email', error);
      continue;
    }
  }
  } catch(error) {
    throw new Error('Error occur when creating batch')
  }
}

const sendEmailInBatches = async (users: Users) => {
  if(users.length === 0){
    logger.info('No user found to send emails')
    return;
  }
  for(const user of users) {
    logger.info(`Sending email to  ${user.email}`);
    try {
      await apiConverterHandler.subscribeToCryptoQuotes({
        id: user.cryptoid,
        email: user.email
      });
    } catch (error) {
      logger.info('Error sending email ', error);
      continue;
    }
  }
}

export const setupCronJob = () => {
  const task = cron.schedule('0 0 * * *', async () => {

    logger.info('Scheduler has started running...');
    try {
      await processBatch()
    } catch(error) {
      logger.info('Error just occurred', error);
    }
  })

  task.start()
}



