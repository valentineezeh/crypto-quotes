export const emailTemplate = (quotes) => {
  return `
  <html>
    <head>
    <style>
    #table {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }

    #table td, #table th {
      border: 1px solid #ddd;
      padding: 8px;
    }

    #table tr:nth-child(even){background-color: #f2f2f2;}

    #table tr:hover {background-color: #ddd;}
    #table th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #0c3756;
      color: white;
    }
    </style>
    </head>
    <body>
      <h1>Welcome to your crypto quotes!</h1>
      <div>
      <table id="table">
        <tr>
          <th>Coin</th>
          <th>Coin symbol</th>
          <th>Currency</th>
          <th>Price</th>
          <th>Volume change 24 hours</th>
          <th>Percent change 1 hour</th>
          <th>Percent change 24 hours</th>
          <th>Percent change 7 days</th>
          <th>Percent change 30 days</th>
          <th>Percent change 60 days</th>
          <th>Percent change 90 days</th>
          <th>Market cap</th>
          <th>Market cap dominance</th>
          <th>Fully diluted market cap</th>
          <th>Last updated</th>
        </tr>
        ${
          quotes.map(quote => {
            return `
              <tr>
                <td>${quote.name}</td>
                <td>${quote.symbol}</td>
                <td>${quote.currency}</td>
                <td>${quote.price}</td>
                <td>${quote.volume_change_24h}</td>
                <td>${quote.percent_change_1h}</td>
                <td>${quote.percent_change_24h}</td>
                <td>${quote.percent_change_7d}</td>
                <td>${quote.percent_change_30d}</td>
                <td>${quote.percent_change_60d}</td>
                <td>${quote.percent_change_90d}</td>
                <td>${quote.market_cap}</td>
                <td>${quote.market_cap_dominance}</td>
                <td>${quote.fully_diluted_market_cap}</td>
                <td>${new Date(quote.last_updated).toLocaleDateString()}</td>
            `
          })
        }
      </table>
      </div>
    </body>
  </html>
`
}