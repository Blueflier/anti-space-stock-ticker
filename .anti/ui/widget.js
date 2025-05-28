"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = widgetUI;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const sdk_1 = require("@antispace/sdk");
const scrape_yahoo_1 = require("../scrape_yahoo");
const StockCard_1 = require("./StockCard");
// import { getStockData } from "../scrape_yahoo"
/**
 * Main widget UI component that handles user interactions and renders the widget interface
 * @param anti - Antispace Context object containing request details
 * @returns JSX markup string response
 */
async function widgetUI(anti) {
    const { action, values, meta } = anti;
    console.log({ action, values, meta });
    // Sample stock tickers - in a real app, this would come from user preferences or database
    const defaultStocks = ['AAPL', 'GOOGL', 'NVDA'];
    // Fetch stock data for all tickers
    const stockDataPromises = defaultStocks.map(async (ticker) => {
        const data = await (0, scrape_yahoo_1.getStockData)(ticker);
        return { ticker, data };
    });
    const stockResults = await Promise.all(stockDataPromises);
    const validStocks = stockResults.filter(result => result.data !== null);
    // Handle add stock action
    if (action === 'add_stock' && values?.ticker) {
        const newStockData = await (0, scrape_yahoo_1.getStockData)(values.ticker.toUpperCase());
        if (newStockData) {
            validStocks.push({
                ticker: values.ticker.toUpperCase(),
                data: newStockData
            });
        }
    }
    // Create rows of 2 stocks each
    const stockRows = [];
    for (let i = 0; i < validStocks.length; i += 2) {
        const rowStocks = validStocks.slice(i, i + 2);
        stockRows.push(rowStocks);
    }
    // const stockData = await getStockData('AAPL');
    return (
    // <Anti.Text type="heading1" weight="bold" align="center">
    //   {stockData?.price}
    // </Anti.Text>
    (0, jsx_runtime_1.jsxs)(sdk_1.components.Column, { spacing: "large", padding: "large", children: [(0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "heading1", weight: "bold", align: "center", children: "Stock Market Dashboard" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Divider, { type: "horizontal" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Column, { spacing: "medium", children: stockRows.map((row, rowIndex) => ((0, jsx_runtime_1.jsxs)(sdk_1.components.Row, { spacing: "medium", width: "full", children: [row.map(({ ticker, data }) => ((0, jsx_runtime_1.jsx)(StockCard_1.StockCard, { ticker: ticker, price: data.price, change: data.change }, ticker))), row.length === 1 && ((0, jsx_runtime_1.jsx)(sdk_1.components.Column, { width: "auto", children: (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { children: " " }) }))] }, rowIndex))) }), (0, jsx_runtime_1.jsx)(sdk_1.components.Divider, { type: "horizontal" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Column, { spacing: "medium", align: "center", children: (0, jsx_runtime_1.jsxs)(sdk_1.components.Row, { spacing: "medium", align: "center", children: [(0, jsx_runtime_1.jsx)(sdk_1.components.Input, { name: "ticker", placeholder: "Enter stock ticker (e.g., AAPL)", width: "half" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Button, { action: "add_stock", text: "Add Stock", type: "primary" })] }) })] }));
}
