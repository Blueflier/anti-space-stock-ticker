"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_stock = exports.say_nickname = exports.set_nickname = void 0;
/**
 * Function to set the user's nickname
 */
exports.set_nickname = {
    type: "function",
    function: {
        name: "set_nickname",
        description: "Set user's nickname",
        parameters: {
            type: "object",
            properties: {
                nickname: {
                    type: "string",
                    description: "Nickname string",
                },
            },
            required: ["nickname"],
        },
    },
};
exports.say_nickname = {
    type: "function",
    function: {
        name: "say_nickname",
        description: "Echo back the user's nickname",
        parameters: {
            type: "object",
            properties: {},
            required: [],
        },
    },
};
exports.add_stock = {
    type: "function",
    function: {
        name: "add_stock",
        description: "Add a new stock to the dashboard",
        parameters: {
            type: "object",
            properties: {
                ticker: {
                    type: "string",
                    description: "Stock ticker symbol (e.g., AAPL, GOOGL)",
                },
            },
            required: ["ticker"],
        },
    },
};
