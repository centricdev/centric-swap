import * as tronWeb from "tronweb";

export class TronWebService {
  public static isAddress = (potentialAddress: string): boolean =>
    tronWeb.isAddress(potentialAddress);

  public static toSun = (trxAmount: number): number => {
    if (trxAmount) {
      return Number(tronWeb.toSun(trxAmount));
    }

    return 0;
  };

  public static fromSun = (sunAmount: number): number => {
    if (sunAmount) {
      return Number(tronWeb.fromSun(sunAmount));
    }

    return 0;
  };

  public static isHexAddress = (address: string) => {
    return tronWeb.utils.isHex(address);
  };

  public static getBase58Address = (hexAddress: string) => {
    if (TronWebService.isHexAddress(hexAddress)) {
      return tronWeb.address.fromHex(hexAddress);
    }
    return hexAddress;
  };

  public static getHexAddress = (address: string) => {
    if (TronWebService.isHexAddress(address)) {
      return address;
    }
    return tronWeb.address.toHex(address);
  };
}
