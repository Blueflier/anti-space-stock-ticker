import type { AntispaceMetadata } from "@antispace/sdk"

export const setNickname = async (nickname: string, anti: AntispaceMetadata) => {
  console.log("setNickname", nickname)
}

export const sayNickname = async (anti: AntispaceMetadata) => {
  // placeholder
}

export const addStock = async (ticker: string, anti: AntispaceMetadata) => {
  console.log("addStock", ticker)
  // In a real implementation, you would save this to a database or user preferences
  // For now, we'll just log it as the widget handles the display logic
}
