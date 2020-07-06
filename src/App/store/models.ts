export enum WalletActions {
  GET_WALLET_SUCCESS = "GET_WALLET_SUCCESS",
  GET_WALLET = "GET_WALLET",
  GET_WALLET_FAILED = "GET_WALLET_FAILED",
  /*TRON_NOT_INSTALLED = "[User - tron] TRON_NOT_INSTALLED",
  TRON_STOP = "[User - tron] TRON_STOP",
  TRON_INSTALLED_AND_LOGGED_IN = "[User - tron] TRON_INSTALLED_AND_LOGGED_IN",
  TRON_INSTALLED_AND_NOT_LOGGED_IN = "[User - tron] TRON_INSTALLED_AND_NOT_LOGGED_IN",
  TRON_POLL_BALANCE = "[User - tron] TRON_POLL_BALANCE",
  UPDATE_BALANCE = "[User] UPDATE_BALANCE",*/
}

export enum Currency {
  TRX = "trx",
  CNS = "cns",
  CNR = "cnr",
}

export interface CurrencyInterface {
  string: {};
  address: string | null;
}

export enum WalletStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  CONNECTED = "CONNECTED",
  NOTCONNECTED = "NOTCONNECTED",
  NOTLOGGEDIN = "NOTLOGGEDIN",
}

export interface Balance {
  balance: string | number;
}

export interface Wallet {
  walletStatus: WalletStatus;
  address: string | null;
}

export enum AccountStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  ACTIVE = "ACTIVE",
  NOTACTIVE = "NOTACTIVE",
  NOTCONNECTED = "NOTCONNECTED",
}

export enum AccountActions {
  GET_ACCOUNT_SUCCESS = "GET_ACCOUNT_SUCCESS",
  GET_ACCOUNT = "GET_ACCOUNT",
  GET_ACCOUNT_FAILED = "GET_ACCOUNT_FAILED",
}

export interface Account {
  accountStatus: AccountStatus;
  trx: Balance;
  cnr: Balance;
  cns: Balance;
}

export interface Validation {
  validationStatus: ValidationStatus;
  validationMessage: ValidationMessage;
}

export enum ValidationStatus {
  IDLE = "IDLE",
  NONE = "NONE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum ValidationMessage {
  trx = "TRX transaction fee failed, please ensure a minimum of 1 TRX is in your address.",
  cnr = "Not enough Centric Rise to swap.",
  cns = "Not enough Centric Cash to swap.",
  WALLETLOGIN = "Please login to your wallet and refresh the page.",
  WALLETCONNECT = "Wallet not found",
  INVALID = "Invalid amount.",
  EMPTY = "",
  PRICE = "Network error. Please refresh the page.",
}

export enum PriceStatus {
  IDLE = "IDLE",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export interface Prices {
  priceStatus: PriceStatus;
  cnr: number;
  block: number;
}

export enum SwapMessage {
  PROCESSING = "Transaction processing",
  SUCCESS = "Transaction complete",
  FAILED = "Transaction failed",
}

export enum SwapStatus {
  IDLE = "IDLE",
  PROCESSING = "PROCESSING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
