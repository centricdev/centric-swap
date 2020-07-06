import { useRef, useEffect, useCallback, useReducer } from "react";
import * as TronGrid from "trongrid";
import tronService from "../services/Tron.service";
import walletManager from "../services/WalletManager.service";
import {
  Wallet as WalletInterface,
  WalletStatus,
  WalletActions,
} from "../store/models";
import { message } from "antd";

const initalState = {
  walletStatus: WalletStatus.IDLE,
  address: "",
};

const walletReducer = (state, action) => {
  switch (action.type) {
    case WalletActions.GET_WALLET:
      return {
        ...state,
        walletStatus: WalletStatus.LOADING,
      };
    case WalletActions.GET_WALLET_SUCCESS:
      return {
        ...state,
        address: action.address,
        walletStatus: WalletStatus.CONNECTED,
      };
    case WalletActions.GET_WALLET_FAILED:
      return {
        ...initalState,
        walletStatus: action.walletStatus,
      };
    default:
      throw new Error();
  }
};

const useActiveWallet = () => {
  const lastAddress = useRef();
  const [activeWallet, setActiveWallet]: [WalletInterface, any] = useReducer(
    walletReducer,
    initalState
  );

  const initWallet = useCallback(async () => {
    try {
      setActiveWallet({ type: WalletActions.GET_WALLET });
      const instance = await walletManager.getTronLinkInstance(12);
      tronService.tronWeb = instance;
      tronService.tronGrid = new TronGrid(instance);
      tronService.riseContract = await tronService.getRiseContract();
      tronService.cashContract = await tronService.getCashContract();
      const { base58: address } = tronService.tronWeb.defaultAddress;
      lastAddress.current = address;
      setActiveWallet({
        type: WalletActions.GET_WALLET_SUCCESS,
        address,
      });
      message.destroy();
      message.success("wallet connected");
    } catch (e) {
      setActiveWallet({
        type: WalletActions.GET_WALLET_FAILED,
        walletStatus: WalletStatus[e],
      });
      message.destroy();
      message.error("wallet not connected");
    }
  }, []);

  const changeWallet = async (e) => {
    try {
      const { base58: address } = e;
      if (lastAddress.current === address) {
        return;
      }
      lastAddress.current = address;
      setActiveWallet({
        type: WalletActions.GET_WALLET_SUCCESS,
        address,
      });
      message.destroy();
      message.success("wallet changed");
    } catch (e) {
      setActiveWallet({
        type: WalletActions.GET_WALLET_FAILED,
        walletStatus: WalletStatus.NOTCONNECTED,
      });
      message.destroy();
      message.error("wallet not found");
      console.info("[TronLink] not logged in, but installed");
    }
  };

  if (activeWallet.walletStatus === WalletStatus.CONNECTED) {
    tronService.onAccountAddressChanged(changeWallet);
  }

  useEffect(() => {
    message.loading("loading wallet", 0);
    initWallet();
  }, [initWallet]);

  return activeWallet;
};

export default useActiveWallet;
