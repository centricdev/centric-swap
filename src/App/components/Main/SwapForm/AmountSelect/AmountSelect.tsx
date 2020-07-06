import React from "react";
import {
  formatLocal,
  multiply,
  formatTrunc,
} from "../../../../../utils/number";
import { Form, Radio } from "antd";
import "./AmountSelect.scss";

const AmountSelect = ({
  form,
  disabled,
  fromCurrency,
  account,
  changeAmount,
}) => {
  return (
    <Form.Item name="amountSelect" className="SwapForm__amountSelect">
      <Radio.Group
        disabled={disabled}
        className="AmountSelect"
        onChange={(e) => {
          const newAmount = multiply(
            Number(e.target.value),
            account[fromCurrency].balance
          );
          changeAmount(formatTrunc(newAmount).toString());
          form.setFieldsValue({
            amount: formatLocal(newAmount, 2, 8),
          });
        }}
      >
        <Radio.Button value={0.1}>10%</Radio.Button>
        <Radio.Button value={0.25}>25%</Radio.Button>
        <Radio.Button value={0.5}>50%</Radio.Button>
        <Radio.Button value={0.75}>75%</Radio.Button>
        <Radio.Button value={1}>100%</Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};
export default AmountSelect;
