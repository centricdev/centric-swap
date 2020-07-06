import React from "react";
import { ValidationStatus } from "../../../store/models";
import { Row, Col, Alert } from "antd";
import "./Validation.scss";

const Validation = ({ validation }) => {
  const { validationStatus, validationMessage } = validation;
  return (
    <Row justify="center" className="Validation container">
      <Col className="container__column">
        {validationStatus === ValidationStatus.FAILED ? (
          <Alert
            message={validationMessage}
            type="error"
            className="Validation__error"
          />
        ) : null}
      </Col>
    </Row>
  );
};
export default Validation;
