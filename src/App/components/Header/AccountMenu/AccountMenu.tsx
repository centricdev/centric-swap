import React from "react";
import { EXPLORER_ADDRESS } from "../../../../config";
import { WalletStatus } from "../../../store/models";
import { ShowIcon } from "../../";
import { formatLocal } from "../../../../utils/number";
import { Menu } from "antd";
import "./AccountMenu.scss";
const { Divider } = Menu;

const AccountMenu = ({ balances, walletStatus, address }) => {
  const { trx, cnr, cns } = balances;
  return (
    <Menu theme={"dark"} className="AccountMenu">
      <Menu.Item disabled className="AccountMenu__balance">
        <ShowIcon icon="tron" /> {formatLocal(trx.balance, 6, 6)}
      </Menu.Item>
      <Menu.Item disabled className="AccountMenu__balance">
        <ShowIcon icon="cnr" /> {formatLocal(cnr.balance, 6, 6)}
      </Menu.Item>
      <Menu.Item disabled className="AccountMenu__balance">
        <ShowIcon icon="cns" /> {formatLocal(cns.balance, 6, 6)}
      </Menu.Item>
      <Divider />
      {walletStatus === WalletStatus.CONNECTED && address.length && (
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${EXPLORER_ADDRESS}/account/${address}`}
          >
            Transaction History
          </a>
        </Menu.Item>
      )}
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href={EXPLORER_ADDRESS}>
          Explorer
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.joincentric.com/faq-general/"
        >
          FAQ
        </a>
      </Menu.Item>
    </Menu>
  );
};

export default AccountMenu;
