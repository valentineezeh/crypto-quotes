# crypto-quotes
Crypto quotes is an application that sends the latest crypto quotes to a user email when the user inputs an email and selects a crypto coin.

[API Documentation](https://crypto-quotes-production.up.railway.app/)
[Frontend URL](https://ancient-turn-production.up.railway.app/)

# Technologies Used
- React
- React-router
- Apollo/Client
- Google API
- React Test Lib
- Apollo Server
- Typescript
- Nodemailer
- Node Cron
- Axios
- Graphql
- Postgres
- Winston
- JWT

# Features
- Users can log in using their Gmail account to become authenticated users.
- Authenticated Users should be able to request crypto coin quotes in these currencies EUR, USD, BRL, GBP, AUD, and USD.
- Authenticated Users should be able to get regular updates on the requested crypto coin in their email.
- Authenticated users should be able to log out.

# Current limitations
- The third-party APIs used in building this application are not reliable because it is on a free tier plan and sometimes may return errors or incorrect data and slow response time.
- The third-party APIs are on a Basic plan which comes with access restrictions, making me not have full access to specific API endpoints.
- Furthermore, because  of the usage of Google's API, only a limited number of requests per day may be allowed.
- The app is not fully responsive, it's designed for desktop viewing only.
- The project is deployed on Railway which uses a free tier, so there might be some delays due to server response time.

# To Install
- Download or clone the repository
- Open the terminal and CD into the backend and frontend folders respectively.
- Run the Backend application using Node --version v16.20.2
- Run the frontend application using Node --version v21.6.1
- Go through the .envSample file  in both directories, rename it as a ".env" file, and fill in your own values.
- Type `npm install` to install all dependencies
- Type `npm start` to run the backend app locally
- Type `npm run dev` to run frontend app locally
- npm test to run the test suite on the app

##
API Endpoint: https://crypto-quotes-production.up.railway.app/

##
Deployment: https://railway.app

# Note
- If you'd like to get more information about the backend and frontend, cd into their respective folder and read the README file.
- The Cron job is scheduled to run once a day. 

## AUTHOR
[Valentine Ezeh](https://github.com/valentineezeh/crypto-quotes)

