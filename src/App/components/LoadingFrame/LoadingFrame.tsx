import React from "react";
import swapSpinner from "./swap_spinner.svg";
import "./LoadingFrame.scss";

const LoadingFrame = () => {
  return (
    <div className="LoadingFrame">
      <img src={swapSpinner} className="LoadingFrame__spinner" alt="" />
    </div>
  );
};

export default LoadingFrame;
