import { components as Anti } from "@antispace/sdk"

export interface StockCardProps {
  ticker: string
  price: string
  change: string
}

export function StockCard({ ticker, price, change }: StockCardProps) {
  // Determine if the change is positive or negative for styling
  const isPositive = change.includes('+') || (!change.includes('-') && !change.includes('('))
  const changeType = isPositive ? 'positive' : 'negative'
  
  // Clean up the price to ensure it displays properly
  const cleanPrice = price.replace(/[^\d.,]/g, '')
  
  return (
    <Anti.Column 
      type="border" 
      padding="medium" 
      spacing="small" 
      align="left"
      width="auto"
    >
      <Anti.Row align="center" spacing="small">
        <Anti.Text type="heading2" weight="bold">{ticker.toUpperCase()}</Anti.Text>
        <Anti.Badge 
          type={isPositive ? 'primary' : 'danger'} 
          text={isPositive ? 'UP' : 'DOWN'} 
        />
      </Anti.Row>
      
      <Anti.Text type="heading1" weight="semibold">
        ${cleanPrice}
      </Anti.Text>
      
      <Anti.Text type={changeType} weight="medium">
        {change}
      </Anti.Text>
    </Anti.Column>
  )
}

export function AddStockCard() {
  return (
    <Anti.Column 
      type="border" 
      padding="medium" 
      spacing="small" 
      align="center"
      width="auto"
    >
      <Anti.Row align="center" spacing="small">
        <Anti.Text type="heading1" weight="light" align="center">+</Anti.Text>
      </Anti.Row>
      
      <Anti.Text type="body" align="center">
        Add Stock
      </Anti.Text>
      
      <Anti.Text type="small" align="center">
        Click below to add a new stock to your dashboard
      </Anti.Text>
    </Anti.Column>
  )
} 