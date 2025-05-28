import { components as Anti, type AntispaceContext } from "@antispace/sdk"
import type { MyAppUIActions } from "../../types"
import stockData from "../data.json"
import { StockCard } from "./StockCard"

/**
 * Main widget UI component that handles user interactions and renders the widget interface
 * @param anti - Antispace Context object containing request details
 * @returns JSX markup string response
 */
export default async function widgetUI(anti: AntispaceContext<MyAppUIActions>) {
  const { action, values, meta } = anti

  console.log({ action, values, meta })

  // Group stocks into rows of 2
  const stockRows: typeof stockData.companies[] = []
  for (let i = 0; i < stockData.companies.length; i += 2) {
    stockRows.push(stockData.companies.slice(i, i + 2))
  }

  return (
    <Anti.Column spacing="large" padding="large" width="full">
      <Anti.Text type="heading1" weight="bold" align="center">Stock Market Dashboard</Anti.Text>
      <Anti.Text type="subheading" align="center">Real-time stock prices and performance</Anti.Text>
      
      <Anti.Divider type="horizontal" />
      
      <Anti.Column spacing="medium" width="full">
        {stockRows.map((row, rowIndex) => (
          <Anti.Row key={rowIndex} spacing="medium" width="full">
            {row.map((stock) => (
              <Anti.Column key={stock.symbol} width="half">
                <StockCard stock={stock} />
              </Anti.Column>
            ))}
          </Anti.Row>
        ))}
      </Anti.Column>
    </Anti.Column>
  )
}
