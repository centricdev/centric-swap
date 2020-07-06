import React, { useState, useEffect } from "react";
import { EXPLORER_ADDRESS } from "../../../../config";
import {
  Currency,
  ValidationStatus,
  PriceStatus,
  SwapStatus,
  SwapMessage,
} from "../../../store/models";
import { calculateReceiveAmount } from "../../../../utils/conversion";
import { ShowIcon } from "../../";
import { Row, Col } from "antd";
import "./Confirm.scss";

export enum ButtonClass {
  IDLE = "Confirm__button Confirm__button--idle",
  NONE = "Confirm__button Confirm__button--idle",
  LOADING = "Confirm__button Confirm__button--loading",
  SUCCESS = "Confirm__button Confirm__button--success",
  RESULTSUCCESS = "Confirm__button Confirm__button--resultSuccess",
  RESULTFAILED = "Confirm__button Confirm__button--resultFailed",
  FAILED = "Confirm__button Confirm__button--failed",
}

const RenderButtonClass = (validationStatus, swapStatus) => {
  switch (swapStatus) {
    case SwapStatus.IDLE:
      return ButtonClass[validationStatus];
    case SwapStatus.SUCCESS:
      return ButtonClass["RESULTSUCCESS"];
    case SwapStatus.FAILED:
      return ButtonClass["RESULTFAILED"];
    case SwapStatus.PROCESSING:
      return ButtonClass["LOADING"];
    default:
      return ButtonClass[validationStatus];
  }
};

const RenderSwapButton = ({ validationStatus, swapStatus }) => {
  return (
    <button
      className={RenderButtonClass(validationStatus, swapStatus)}
      disabled={
        (validationStatus !== ValidationStatus.SUCCESS ||
          swapStatus !== SwapStatus.IDLE) &&
        true
      }
    >
      {swapStatus === SwapStatus.IDLE ? (
        <ShowIcon icon={"swap_text"} />
      ) : (
        <span>{SwapMessage[swapStatus]}</span>
      )}
    </button>
  );
};

const Confirm = ({ validationStatus, fromCurrency, prices, swapStatus }) => {
  const { priceStatus, cnr: cnrPrice, block } = prices;
  const [converRate, setConverRate]: [string | null, any] = useState(null);

  useEffect(() => {
    if (priceStatus === PriceStatus.SUCCESS) {
      const rate = calculateReceiveAmount(fromCurrency, 1, cnrPrice);
      setConverRate(rate);
    }
  }, [cnrPrice, fromCurrency, priceStatus]);

  return (
    <Row justify="center" className="Confirm container">
      <Col className="Confirm__inner">
        <div>
          <RenderSwapButton
            validationStatus={validationStatus}
            swapStatus={swapStatus}
          />
        </div>
        <div className="Confirm__stats">
          <div>
            {priceStatus === PriceStatus.SUCCESS && (
              <span>
                Price Block:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${EXPLORER_ADDRESS}/data/prices`}
                  className="Confirm__stats__link"
                >
                  {block}
                </a>
              </span>
            )}
          </div>
          <div>
            {priceStatus === PriceStatus.SUCCESS &&
              (fromCurrency === Currency.CNR ? (
                <span>1 CNR = {converRate} CNS</span>
              ) : (
                <span>1 CNS = {converRate} CNR</span>
              ))}
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default Confirm;
