"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockCard = StockCard;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const sdk_1 = require("@antispace/sdk");
/**
 * Stock Card Component
 * @param stock - Stock object containing symbol, name, price, and percent
 */
function StockCard({ stock }) {
    const isPositive = stock.percent >= 0;
    const percentageText = `${isPositive ? '+' : ''}${stock.percent.toFixed(2)}%`;
    return ((0, jsx_runtime_1.jsxs)(sdk_1.components.Row, { type: "border", padding: "medium", width: "full", spacing: "medium", align: "center", children: [(0, jsx_runtime_1.jsxs)(sdk_1.components.Column, { width: "auto", spacing: "small", align: "left", children: [(0, jsx_runtime_1.jsxs)(sdk_1.components.Row, { spacing: "small", align: "center", children: [(0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "heading3", weight: "semibold", children: stock.symbol }), (0, jsx_runtime_1.jsx)(sdk_1.components.Badge, { type: isPositive ? "accent" : "danger", text: percentageText })] }), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "body", weight: "medium", children: stock.name })] }), (0, jsx_runtime_1.jsxs)(sdk_1.components.Column, { width: "auto", align: "right", children: [(0, jsx_runtime_1.jsxs)(sdk_1.components.Text, { type: "heading2", weight: "bold", children: ["$", stock.price.toFixed(2)] }), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: isPositive ? "positive" : "negative", weight: "medium", children: percentageText })] })] }));
}
