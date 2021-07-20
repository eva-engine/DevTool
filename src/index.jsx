import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { Row, Col } from "antd";
import "antd/dist/antd.css";

import SearchTree from "./Components/SearchTree/index";
import Tables from "./Components/Tables/index";
import Data, {
  CategoryDataContext,
  INIT_DEVTOOL,
  CHANGE_NODE_ID,
} from "./Data";

function App() {
  const { dispatch } = useContext(CategoryDataContext);
  // const obj = [
  //   {
  //     "position.x": "0",
  //     "position.y": "0",
  //     name: "Transform",
  //   },
  //   {
  //     "position.x": "0",
  //     "position.y": "0",
  //     name: "ninePatch",
  //   },
  // ];

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
        dispatch({
          type: INIT_DEVTOOL,
          data: {
            gData: [request.tree.outliner],
            initComponents: request.tree.nodes[1].components,
            nodes: request.tree.nodes,
            nodeId: 1
          },
        });
      }
    });
    return () => {};
  }, []);

  return (
    <>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <SearchTree />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
        <Col xs={11} sm={11} md={11} lg={11} xl={11}>
          <Tables className="tables" />
        </Col>
      </Row>
    </>
  );
}

ReactDOM.render(
  <Data>
    <App />
  </Data>,
  document.getElementById("root")
);
