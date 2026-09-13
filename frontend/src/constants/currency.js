// constants/currency.js
// Approximate USD ↔ PKR exchange rate — update this occasionally to stay current.
export const USD_TO_PKR = 278;

export const toUSD = (pkrAmount) => Math.round(pkrAmount / USD_TO_PKR);