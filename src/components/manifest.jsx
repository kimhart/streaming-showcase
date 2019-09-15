import React from "react";
import JSONPretty from "react-json-pretty";
var JSONPrettyMon = require("react-json-pretty/dist/monikai");

const Manifest = (props) => {
  return (
    <div className="manifest">
      <JSONPretty id="json-pretty" data={props.json} theme={JSONPrettyMon} />
    </div>
  );
}

export default Manifest;
