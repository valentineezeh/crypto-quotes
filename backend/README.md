# Crypto-quotes
Welcome to crypto-quotes backend readMe.

[API Endpoint Documentation](https://crypto-quotes-production.up.railway.app/)

# Technologies Used
- Apollo Server
- Typescript
- Nodemailer
- Node Cron
- Axios
- Graphql
- Postgres
- Winston
- JWT

## API Endpoints

- This Query gets all the available cryptocurrencies from destined third party api: `GET https://pro-api.coinmarketcap.com`
#### GET /v1/cryptocurrency/map
Returns a map of cryptocurrencies with their corresponding prices and market capitalization. The response includes an array of objects, where each object contains: `id`, `name`, `symbol`

### Query Request
```
query Query {
  cryptoCurrencies {
    data {
      id
      name
      symbol
    }
    success
  }
}
```

### Response ({ success: true })
```
{
  "data": {
    "cryptoCurrencies": {
      "data": [
        {
          "id": 1,
          "name": "Bitcoin",
          "symbol": "BTC"
        },
        {
          "id": 2,
          "name": "Litecoin",
          "symbol": "LTC"
        },
        ]
    }
  }
}
```

### Mutation Request
- Mutation request to sign up with Google
```
mutation Mutation($accessToken: String!) {
  signUpGoogle(accessToken: $accessToken) {
    accessToken
    errorCheck
    success
  }
}
```

- Mutation request to get and subscribe for a crypto quote
```
mutation Mutation($email: String!, $subscribeForCryptoQuotesId: String!) {
  subscribeForCryptoQuotes(email: $email, id: $subscribeForCryptoQuotesId) {
    message
    success
    errorCheck
  }
}
```


# To Install
- Download or clone the repository
- Open terminal and CD into the backend folder.
- Run the backend application using Node --version v16.20.2
- Go through the .envSample file  in the backend directory, rename it as a ".env" file and fill in your own values.
- Type `npm install` to install all dependencies
- Type `npm start` to run backend app locally
- Type `npm run test` to run the test suits on the app

##
API Endpoint: https://crypto-quotes-production.up.railway.app/

## AUTHOR
[Valentine Ezeh](https://github.com/valentineezeh/crypto-quotes)
