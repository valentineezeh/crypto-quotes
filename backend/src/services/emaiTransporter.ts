import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

dotenv.config();

const smtpConfig: SMTPTransport.Options = {
  host: process.env.SMPT_HOST,
  port: Number(process.env.SMPT_PORT),
  secure: true,
  auth: {
    user: process.env.SMPT_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
};

export const transporter = nodemailer.createTransport(smtpConfig);
