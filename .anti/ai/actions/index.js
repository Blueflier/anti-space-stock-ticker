"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStock = exports.sayNickname = exports.setNickname = void 0;
const setNickname = async (nickname, anti) => {
    console.log("setNickname", nickname);
};
exports.setNickname = setNickname;
const sayNickname = async (anti) => {
    // placeholder
};
exports.sayNickname = sayNickname;
const addStock = async (ticker, anti) => {
    console.log("addStock", ticker);
    // In a real implementation, you would save this to a database or user preferences
    // For now, we'll just log it as the widget handles the display logic
};
exports.addStock = addStock;
