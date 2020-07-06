import { useEffect, useCallback, useReducer, useRef } from "react";
import tronService from "../services/Tron.service";
import {
  Account as AccountInterface,
  AccountStatus,
  AccountActions,
  WalletStatus,
  Currency,
} from "../store/models";

const initalState = {
  accountStatus: AccountStatus.NOTCONNECTED,
  [Currency.TRX]: {
    balance: 0,
  },
  [Currency.CNR]: {
    balance: 0,
  },
  [Currency.CNS]: {
    balance: 0,
  },
};

const accountReducer = (state, action) => {
  switch (action.type) {
    case AccountActions.GET_ACCOUNT:
      return {
        ...state,
        accountStatus: AccountStatus.LOADING,
      };
    case AccountActions.GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        accountStatus: AccountStatus.ACTIVE,
        [Currency.TRX]: {
          balance: action.trxBalance,
        },
        [Currency.CNR]: {
          balance: action.riseBalance,
        },
        [Currency.CNS]: {
          balance: action.cashBalance,
        },
      };
    case AccountActions.GET_ACCOUNT_FAILED:
      return {
        ...initalState,
        accountStatus: action.accountStatus,
      };
    default:
      throw new Error();
  }
};

const useAccount = ({ address, walletStatus }) => {
  const pollRef: any = useRef(null);
  const [account, setAccount]: [AccountInterface, any] = useReducer(
    accountReducer,
    initalState
  );

  const getAccount = useCallback(async () => {
    try {
      const {
        trxBalance,
        riseBalance,
        cashBalance,
      } = await tronService.getAccount(address);

      setAccount({
        type: AccountActions.GET_ACCOUNT_SUCCESS,
        trxBalance,
        riseBalance,
        cashBalance,
      });
    } catch (e) {
      setAccount({
        type: AccountActions.GET_ACCOUNT_FAILED,
        accountStatus: AccountStatus.NOTACTIVE,
      });
    }
  }, [address]);

  useEffect(() => {
    if (pollRef.current !== null) {
      clearInterval(pollRef.current);
    }
    if (walletStatus === WalletStatus.CONNECTED) {
      setAccount({
        type: AccountActions.GET_ACCOUNT,
      });
      getAccount();
      pollRef.current = setInterval(() => {
        getAccount();
      }, 6000);
    } else {
      setAccount({
        type: AccountActions.GET_ACCOUNT_FAILED,
        accountStatus:
          walletStatus === WalletStatus.NOTCONNECTED ||
          walletStatus === WalletStatus.NOTLOGGEDIN
            ? AccountStatus.NOTCONNECTED
            : AccountStatus.IDLE,
      });
    }
  }, [address, getAccount, walletStatus]);

  return account;
};

export default useAccount;
