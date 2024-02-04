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

### Response when authentication is required ({ success: false })
```
{
  "data": {
    "cryptoCurrencies": {
      "data": [],
      "success": false,
      "errorCheck": {
        "message": "Authentication is required to access this Endpoint."
      }
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

### Response when authentication is required ({ success: false })
```
{
  "data": {
    "subscribeForCryptoQuotes": {
      "message": null,
      "success": false,
      "errorCheck": {
        "message": "Authentication is required to access this Endpoint."
      }
    }
  }
}
```

### Response when authenticated user has already subscribed for a crypto coin quotes ({ success: false })

```
{
  "data": {
    "subscribeForCryptoQuotes": {
      "message": "This user has already subscribe to this crypto quotes.",
      "success": false,
      "errorCheck": {}
    }
  }
}
```

### Response when authenticated user subscribe to a crypto quote ({ success: true })
```
{
  "data": {
    "subscribeForCryptoQuotes": {
      "message": "Email sent! Crypto Quote has successfully be sent to this email mail@gmail.com.",
      "success": true,
      "errorCheck": {}
    }
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
