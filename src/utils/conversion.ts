import { Currency } from "../App/store/models";
import {
  divide,
  multiply,
  formatTrunc,
  formatCurrency,
  formatLocal,
} from "./number";

const calculateTokenAmount = (currency, amount, cnrPrice, cnsPrice) => {
  return currency === Currency.CNR
    ? formatLocal(divide(amount, cnrPrice), 2, 8)
    : formatLocal(multiply(amount, cnsPrice), 2, 8);
  /*return fromCurrency === Currency.CNR
    ? formatLocal(formatTrunc(divide(inputAmount, cnrPrice)), 2, 8)
    : formatLocal(formatTrunc(multiply(inputAmount, cnsPrice)), 2, 8);*/
  /*return fromCurrency === Currency.CNR
    ? formatCurrency(formatTrunc(divide(inputAmount, cnrPrice)).toString())
    : formatCurrency(formatTrunc(multiply(inputAmount, cnsPrice)).toString());*/
};

const calculateTokenValue = (currency, amount, cnrPrice, cnsPrice) => {
  return currency === Currency.CNR
    ? formatLocal(multiply(amount, cnrPrice), 2, 2)
    : formatLocal(divide(amount, cnsPrice), 2, 2);
};

const calculateReceiveAmount = (currency, amount, cnrPrice) => {
  return currency === Currency.CNR
    ? formatLocal(multiply(amount, cnrPrice), 2, 8)
    : formatLocal(divide(amount, cnrPrice), 2, 8);
  /*return fromCurrency === Currency.CNR
    ? formatLocal(formatTrunc(multiply(inputAmount, cnrPrice)), 2, 8)
    : formatLocal(formatTrunc(divide(inputAmount, cnrPrice)), 2, 8);*/
  /*return fromCurrency === Currency.CNR
    ? formatCurrency(formatTrunc(multiply(inputAmount, cnrPrice)).toString())
    : formatCurrency(formatTrunc(divide(inputAmount, cnrPrice)).toString());*/
};

export { calculateTokenAmount, calculateTokenValue, calculateReceiveAmount };
