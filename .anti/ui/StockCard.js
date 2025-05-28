"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockCard = StockCard;
exports.AddStockCard = AddStockCard;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const sdk_1 = require("@antispace/sdk");
function StockCard({ ticker, price, change }) {
    // Determine if the change is positive or negative for styling
    const isPositive = change.includes('+') || (!change.includes('-') && !change.includes('('));
    const changeType = isPositive ? 'positive' : 'negative';
    // Clean up the price to ensure it displays properly
    const cleanPrice = price.replace(/[^\d.,]/g, '');
    return ((0, jsx_runtime_1.jsxs)(sdk_1.components.Column, { type: "border", padding: "medium", spacing: "small", align: "left", width: "auto", children: [(0, jsx_runtime_1.jsxs)(sdk_1.components.Row, { align: "center", spacing: "small", children: [(0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "heading2", weight: "bold", children: ticker.toUpperCase() }), (0, jsx_runtime_1.jsx)(sdk_1.components.Badge, { type: isPositive ? 'primary' : 'danger', text: isPositive ? 'UP' : 'DOWN' })] }), (0, jsx_runtime_1.jsxs)(sdk_1.components.Text, { type: "heading1", weight: "semibold", children: ["$", cleanPrice] }), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: changeType, weight: "medium", children: change })] }));
}
function AddStockCard() {
    return ((0, jsx_runtime_1.jsxs)(sdk_1.components.Column, { type: "border", padding: "medium", spacing: "small", align: "center", width: "auto", children: [(0, jsx_runtime_1.jsx)(sdk_1.components.Row, { align: "center", spacing: "small", children: (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "heading1", weight: "light", align: "center", children: "+" }) }), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "body", align: "center", children: "Add Stock" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "small", align: "center", children: "Click below to add a new stock to your dashboard" })] }));
}
