# crypto-quotes
Crypto quotes is an application that send latest crypto quotes to a user email when the user inputs an email and select a crypto coin.

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
- Users can log in using their gmail account to become authenticated users.
- Authenticated User should be able to request for a crypto coin quotes in this currencies EUR, USD, BRL, GBP, AUD, USD.
- Authenticated User should be able to get regular updates on the requested crypto coin in their email.
- Authenticated User should be able to log out.

# Current limitations
- The third party APIs used in building this application is not reliable because it is on a free tier plan and sometimes may returns errors or incorrect data and slow response time.
- The third party APIs is on a Basic plan which comes with access restrictions, making me not have full access to specific API endpoints.
- Furthermore, because  of the usage of google's api, only a limited number of requests per day may be allowed.
- The app is not fully responsive, it's designed for desktop viewing only.
- The project is deployed on Railway which uses a free tier, so there might be some delays due to server response time.

# To Install
- Download or clone the repository
- Open terminal and CD into the backend and frontend folder respectively .
- Run the Backend application using Node --version v16.20.2
- Run the frontend application using Node --version v21.6.1
- Go through the .envSample file  in both directories, rename it as a ".env" file and fill in your own values.
- Type `npm install` to install all dependencies
- Type `npm start` to run the backend app locally
- Type `npm run dev` to run frontend app locally
- npm test to run the test suits on the app

##
API Endpoint: https://crypto-quotes-production.up.railway.app/

##
Deployment: https://railway.app

## AUTHOR
[Valentine Ezeh](https://github.com/valentineezeh/crypto-quotes)

