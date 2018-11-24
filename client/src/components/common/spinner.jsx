import React from "react";
import spinner from "./ajax_loader_blue_256.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loadind"
      />
    </div>
  );
};
