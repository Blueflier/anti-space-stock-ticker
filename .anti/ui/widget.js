"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = widgetUI;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const sdk_1 = require("@antispace/sdk");
const data_json_1 = __importDefault(require("../data.json"));
/**
 * Stock Card Component
 * @param stock - Stock object containing symbol, name, price, and percent
 */
function StockCard({ stock }) {
    const isPositive = stock.percent >= 0;
    const percentageText = `${isPositive ? '+' : ''}${stock.percent.toFixed(2)}%`;
    return ((0, jsx_runtime_1.jsxs)(sdk_1.components.Row, { type: "border", padding: "medium", width: "full", spacing: "medium", align: "center", children: [(0, jsx_runtime_1.jsxs)(sdk_1.components.Column, { width: "auto", spacing: "small", align: "left", children: [(0, jsx_runtime_1.jsxs)(sdk_1.components.Row, { spacing: "small", align: "center", children: [(0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "heading3", weight: "semibold", children: stock.symbol }), (0, jsx_runtime_1.jsx)(sdk_1.components.Badge, { type: isPositive ? "accent" : "danger", text: percentageText })] }), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "body", weight: "medium", children: stock.name })] }), (0, jsx_runtime_1.jsxs)(sdk_1.components.Column, { width: "auto", align: "right", children: [(0, jsx_runtime_1.jsxs)(sdk_1.components.Text, { type: "heading2", weight: "bold", children: ["$", stock.price.toFixed(2)] }), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: isPositive ? "positive" : "negative", weight: "medium", children: percentageText })] })] }));
}
/**
 * Main widget UI component that handles user interactions and renders the widget interface
 * @param anti - Antispace Context object containing request details
 * @returns JSX markup string response
 */
async function widgetUI(anti) {
    const { action, values, meta } = anti;
    console.log({ action, values, meta });
    return ((0, jsx_runtime_1.jsxs)(sdk_1.components.Column, { spacing: "large", padding: "large", width: "full", children: [(0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "heading1", weight: "bold", align: "center", children: "Stock Market Dashboard" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Text, { type: "subheading", align: "center", children: "Real-time stock prices and performance" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Divider, { type: "horizontal" }), (0, jsx_runtime_1.jsx)(sdk_1.components.Column, { spacing: "medium", width: "full", children: data_json_1.default.companies.map((stock) => ((0, jsx_runtime_1.jsx)(StockCard, { stock: stock }, stock.symbol))) })] }));
}
