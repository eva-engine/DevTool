import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Row, Col } from "antd";

import SearchTree from "./Components/SearchTree/index";
import Tables from "./Components/Tables/index";

import "antd/dist/antd.css";

function App() {
  const [gData, setGData] = useState([]);
  const [components, setComponents] = useState([])

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
  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      console.log(
        sender.tab ? "来自内容脚本：" + sender.tab.url : "来自扩展程序"
      );
      if (request.sign == "EvaDevtool") {
        sendResponse({ farewell: "index.jsx接收到" });
        setGData([request.tree.outliner]);
        setComponents(request.tree.nodes[1].components);
      }
    });
  }, []);

  return (
    <>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <SearchTree gData={gData} />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
        <Col xs={11} sm={11} md={11} lg={11} xl={11}>
          <Tables className="tables" arr={components} />
        </Col>
      </Row>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
