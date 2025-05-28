import * as cheerio from 'cheerio';

export type StockData = { price: string, change: string } | null

export async function getStockData(ticker: string): Promise<StockData | null> {
  const url = `https://finance.yahoo.com/quote/${ticker}`;

  try {
    const response = await fetch(url, {
      // headers: {
      //   'User-Agent': 'Mozilla/5.0',
      // },
    });
    console.log("response", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();

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

// console.log(await getStockData('AAPL')); // You can replace this with CLI input
