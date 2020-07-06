import * as TronWeb from "tronweb";
import {
  RISE_CONTRACT_ADDRESS,
  TRON_FULL_HOST,
  TOKEN_DECIMALS,
  TRON_PRIVATE_KEY,
} from "../../config";
import { divide } from "../../utils/number";

class PricesService {
  public riseContract: any;
  public tronWeb: any;

  constructor(fullHost: string) {
    this.tronWeb = new TronWeb({
      fullHost: new TronWeb.providers.HttpProvider(fullHost, 2 * 60 * 1000),
      privateKey: TRON_PRIVATE_KEY,
    });
  }

  public toSun = (...args: any[]) => this.tronWeb.toSun(...args);
  public fromSun = (...args: any[]) => this.tronWeb.fromSun(...args);
  public toDecimal = (...args: any[]) => this.tronWeb.toDecimal(...args);
  public toUtf8 = (...args: any[]) => this.tronWeb.toUtf8(...args);

  public getRiseContract = async () => {
    if (this.tronWeb) {
      return this.tronWeb.contract().at(RISE_CONTRACT_ADDRESS);
    }
  };

  public getRisePrice = async () => {
    try {
      if (this.riseContract) {
        const blockPromise = this.riseContract.getCurrentHour().call();
        const pricePromise = this.riseContract.getCurrentPrice().call();
        const [blockNumberHex, priceHex] = await Promise.all([
          blockPromise,
          pricePromise,
        ]);

        const price = divide(await this.toDecimal(priceHex), TOKEN_DECIMALS);
        const blockNumber = await this.toDecimal(blockNumberHex);
        return {
          price,
          blockNumber,
        };
      }
      return {
        price: 0,
        blockNumber: 0,
      };
    } catch (e) {
      console.info("Error getting CNR price");
      throw e;
    }
  };
}

const pricesService = new PricesService(TRON_FULL_HOST);

export default pricesService;
