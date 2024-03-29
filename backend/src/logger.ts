import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config()

const CONSOLE_DATE_FORMAT = 'HH:mm:ss'

const createLogger = () => {
  const label = process.env.LOG_LABEL;
  const level = process.env.LOG_LEVEL;
  const filename = process.env.LOG_FILE;
  const logger = winston.createLogger({ level });

  // Console transport for display messages in the terminal
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.label({ label }),
      winston.format.timestamp({ format: CONSOLE_DATE_FORMAT }),
      winston.format.splat(),
      winston.format.printf(({
        level, message, label, timestamp,
      }) => `${timestamp} [${label}] ${level}: ${message}`),
    ),
  }));

  // If a filename is specified, create a file logger
  if (typeof filename === 'string' && filename.length) {
    logger.add(new winston.transports.File({
      filename,
      format: winston.format.combine(
        winston.format.label({ label }),
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.uncolorize(),
        winston.format.json(),
      ),
    }));
  }

  return logger;
}

export const logger = createLogger();