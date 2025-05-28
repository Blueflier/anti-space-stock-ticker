import { components as Anti, type AntispaceContext } from "@antispace/sdk"
import type { MyAppUIActions } from "../../types"
import stockData from "../data.json"

/**
 * Stock Card Component
 * @param stock - Stock object containing symbol, name, price, and percent
 */
function StockCard({ stock }: { stock: { symbol: string; name: string; price: number; percent: number } }) {
  const isPositive = stock.percent >= 0
  const percentageText = `${isPositive ? '+' : ''}${stock.percent.toFixed(2)}%`
  
  return (
    <Anti.Row type="border" padding="medium" width="full" spacing="medium" align="center">
      <Anti.Column width="auto" spacing="small" align="left">
        <Anti.Row spacing="small" align="center">
          <Anti.Text type="heading3" weight="semibold">{stock.symbol}</Anti.Text>
          <Anti.Badge 
            type={isPositive ? "accent" : "danger"} 
            text={percentageText} 
          />
        </Anti.Row>
        <Anti.Text type="body" weight="medium">{stock.name}</Anti.Text>
      </Anti.Column>
      
      <Anti.Column width="auto" align="right">
        <Anti.Text type="heading2" weight="bold">${stock.price.toFixed(2)}</Anti.Text>
        <Anti.Text 
          type={isPositive ? "positive" : "negative"} 
          weight="medium"
        >
          {percentageText}
        </Anti.Text>
      </Anti.Column>
    </Anti.Row>
  )
}

/**
 * Main widget UI component that handles user interactions and renders the widget interface
 * @param anti - Antispace Context object containing request details
 * @returns JSX markup string response
 */
export default async function widgetUI(anti: AntispaceContext<MyAppUIActions>) {
  const { action, values, meta } = anti

  console.log({ action, values, meta })

  return (
    <Anti.Column spacing="large" padding="large" width="full">
      <Anti.Text type="heading1" weight="bold" align="center">Stock Market Dashboard</Anti.Text>
      <Anti.Text type="subheading" align="center">Real-time stock prices and performance</Anti.Text>
      
      <Anti.Divider type="horizontal" />
      
      <Anti.Column spacing="medium" width="full">
        {stockData.companies.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </Anti.Column>
    </Anti.Column>
  )
}
