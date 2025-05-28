import axios from 'axios';
import * as cheerio from 'cheerio';
type StockData = { price: string, change: string } | null

async function getStockData(ticker: string): Promise<StockData | null> {
  const url = `https://finance.yahoo.com/quote/${ticker}`;

  try {
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const $ = cheerio.load(html);

    const price = $('span[data-testid="qsp-price"]').first().text().trim();
    const change = $('span[data-testid="qsp-price-change-percent"]').first().text().trim();

    if (price && change) {
      return {
        price: price,
        change: change,
      }
    }
  } catch (err) {
    console.error('Failed to fetch stock data:', err);
  }

  return null;

}

console.log(await getStockData('AAPL')); // You can replace this with CLI input
