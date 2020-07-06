import { WalletStatus } from "../store/models";

declare global {
  interface Window {
    tronWeb: any;
  }
}

class WalletManager {
  public getTronLinkInstance = (numOfRetries: number = 11) => {
    console.info("Detecting Tronlink...");
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (numOfRetries > 0) {
          if (!!window.tronWeb && window.tronWeb.defaultAddress.base58) {
            clearInterval(interval);
            resolve(window.tronWeb);
          }
        } else {
          clearInterval(interval);
          if (!!window.tronWeb) {
            reject(WalletStatus.NOTLOGGEDIN);
          }
          reject(WalletStatus.NOTCONNECTED);
        }
        numOfRetries--;
      }, 300);
    });
  };
}

const walletManager = new WalletManager();

export default walletManager;
