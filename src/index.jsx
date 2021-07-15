import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
// import "./index.css";
import SearchTree from "./Components/SearchTree/index";
import Tables from "./Components/Tables/index";

function App() {
  const [value, setValue] = useState(undefined);

  const obj = [
    {
      "position.x": "0",
      "position.y": "0",
      name: "Transform",
    },
    {
      "position.x": "0",
      "position.y": "0",
      name: "ninePatch",
    },
  ];

  return (
    <>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <SearchTree />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
        <Col xs={11} sm={11} md={11} lg={11} xl={11}>
          <Tables className="tables" arr={obj} objId={1} />
        </Col>
      </Row>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
