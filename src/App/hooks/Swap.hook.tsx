import { useCallback, useState } from "react";
import tronService from "../services/Tron.service";
import { SwapMessage, SwapStatus } from "../store/models";
import { message } from "antd";

const useSwap = () => {
  const [swapStatus, setSwapStatus]: [any, any] = useState(SwapStatus.IDLE);

  const triggerSwap = useCallback(
    async (values, fromCurrency, toCurrency, displayValue) => {
      try {
        const { amount } = values;
        setSwapStatus(SwapStatus.PROCESSING);
        message.info(
          `Swap started ${amount} ${fromCurrency.toUpperCase()} for ${displayValue} ${toCurrency.toUpperCase()}`,
          0
        );
        const convertAmount = amount.replace(/,/g, "");
        const transactionId = await tronService.doCentricConvert(
          fromCurrency,
          convertAmount
        );
        message.destroy();
        message.loading(SwapMessage.PROCESSING, 0);
        await tronService.getTransaction(transactionId);
        setSwapStatus(SwapStatus.SUCCESS);
        message.destroy();
        message.success(SwapMessage.SUCCESS);
        setTimeout(function () {
          setSwapStatus(SwapStatus.IDLE);
        }, 5000);
      } catch (e) {
        message.destroy();
        message.error(e.message);
        setSwapStatus(SwapStatus.FAILED);
        setTimeout(function () {
          setSwapStatus(SwapStatus.IDLE);
        }, 5000);
      }
    },
    []
  );

  return { swapStatus, triggerSwap };
};

export default useSwap;
