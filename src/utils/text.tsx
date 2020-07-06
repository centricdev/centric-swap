import React from "react";
import "./Text.scss";

const TruncateAddress = ({ children, address }) => {
  let children_start = children.substring(0, 29);
  let children_end = children.substring(29, 34);
  return (
    <span>
      {address ? (
        <div
          style={{
            display: "table",
            tableLayout: "fixed",
            width: "100%",
            whiteSpace: "nowrap",
          }}
        >
          <div className="ellipsis_box">
            <div className="ellipsis_box_start">{children_start}</div>
            <div className="ellipsis_box_end">{children_end}</div>
          </div>
        </div>
      ) : (
        <div className="ellipsis_box">
          <div className="ellipsis_box_start">{children_start}</div>
          <div className="ellipsis_box_end">{children_end}</div>
        </div>
      )}
    </span>
  );
};

export { TruncateAddress };
