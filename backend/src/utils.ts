import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

type CoinData = {
  id: number;
  name: string;
  symbol: string;
  quote: { [key: string]: Quote };
}

export type Quote = {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: null;
  last_updated: string;
}

export const formatDataPayload = (data) => {
  const mergedQuotes: Array<Quote & { currency: string }> = Object.values(data).flatMap((coin: CoinData) =>
  Object.entries(coin.quote).map(([currency, quote]: [string, Quote]) => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    currency,
    ...quote,
  }))
);

  return mergedQuotes
}

type data = (Quote & {
  currency: string;
})[]

export const calculatePricesInCurrencies = (data: data, rates: object) => {
  const result = [];
  data.forEach((item) => {
    Object.entries(rates).forEach(([currency, rate]) => {
      const newItem = { ...item };
      newItem.currency = currency;
      newItem.price = item.price * Number(rate);
      result.push(newItem);
    });
  });
  return result;
};


export const generateToken = async (userId: string) => {
  const payload = { userId }

  const expiresIn = process.env.ACCESS_TOKEN_EXPIRATION

  const token = jwt.sign({
    payload }, process.env.SECRET, { expiresIn })

  return token;
}