import React from "react";
import { Currency } from "../../../../store/models";
import { ShowIcon } from "../../../";
import "./SwapButton.scss";

const SwapButton = ({ fromCurrency, changeFromCurrency }) => (
  <span
    className={
      fromCurrency === Currency.CNR ? "SwapButton" : "SwapButton rotate"
    }
    onClick={() =>
      changeFromCurrency(
        fromCurrency === Currency.CNR ? Currency.CNS : Currency.CNR
      )
    }
  >
    <ShowIcon icon="swap" />
  </span>
);

export default SwapButton;
