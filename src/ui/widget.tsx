import { components as Anti, type AntispaceContext } from "@antispace/sdk"
import type { MyAppUIActions } from "../../types"
import { getStockData, type StockData } from "../scrape_yahoo"
import { StockCard, AddStockCard } from "./StockCard"
// import { getStockData } from "../scrape_yahoo"

/**
 * Main widget UI component that handles user interactions and renders the widget interface
 * @param anti - Antispace Context object containing request details
 * @returns JSX markup string response
 */
export default async function widgetUI(anti: AntispaceContext<MyAppUIActions>) {
  const { action, values, meta } = anti
  
  console.log({ action, values, meta })

  // Sample stock tickers - in a real app, this would come from user preferences or database
  const defaultStocks = ['AAPL', 'GOOGL','NVDA']
  
  // Fetch stock data for all tickers
  const stockDataPromises = defaultStocks.map(async (ticker) => {
    const data = await getStockData(ticker)
    return { ticker, data }
  })
  
  const stockResults = await Promise.all(stockDataPromises)
  const validStocks: Array<{ ticker: string; data: StockData }> = stockResults.filter(result => result.data !== null)

  // Handle add stock action
  if (action === 'add_stock' && values?.ticker) {
    const newStockData = await getStockData(values.ticker.toUpperCase())
    if (newStockData) {
      validStocks.push({ 
        ticker: values.ticker.toUpperCase(), 
        data: newStockData 
      })
    }
  }

  // Create rows of 2 stocks each
  const stockRows: Array<Array<{ ticker: string; data: StockData }>> = []
  for (let i = 0; i < validStocks.length; i += 2) {
    const rowStocks = validStocks.slice(i, i + 2)
    stockRows.push(rowStocks)
  }
  // const stockData = await getStockData('AAPL');
  return (
    // <Anti.Text type="heading1" weight="bold" align="center">
    //   {stockData?.price}
    // </Anti.Text>
    <Anti.Column spacing="large" padding="large">
      <Anti.Text type="heading1" weight="bold" align="center">
        Stock Market Dashboard
      </Anti.Text>
      
      {/* <Anti.Text type="subheading" align="center">
        Real-time stock prices and changes
      </Anti.Text> */}
      
      <Anti.Divider type="horizontal" />
      
      <Anti.Column spacing="medium">
        {stockRows.map((row, rowIndex) => (
          <Anti.Row key={rowIndex} spacing="medium" width="full">
            {row.map(({ ticker, data }) => (
              <StockCard
                key={ticker}
                ticker={ticker}
                price={data!.price}
                change={data!.change}
              />
            ))}
            {row.length === 1 && (
              <Anti.Column width="auto">
                <Anti.Text> </Anti.Text>
              </Anti.Column>
            )}
          </Anti.Row>
        ))}
        
        {/* <Anti.Row spacing="medium" width="full">
          {validStocks.length % 2 === 0 ? (
            <>
              <AddStockCard />
              <Anti.Column width="auto">
                <Anti.Text> </Anti.Text>
              </Anti.Column>
            </>
          ) : (
            <AddStockCard />
          )}
        </Anti.Row> */}
      </Anti.Column>
      
      <Anti.Divider type="horizontal" />
      
      <Anti.Column spacing="medium" align="center">
        <Anti.Row spacing="medium" align="center">
          <Anti.Input 
            name="ticker" 
            placeholder="Enter stock ticker (e.g., AAPL)" 
            width="half"
          />
          <Anti.Button 
            action="add_stock" 
            text="Add Stock" 
            type="primary"
          />
        </Anti.Row>
      </Anti.Column>
    </Anti.Column>
  )
}
