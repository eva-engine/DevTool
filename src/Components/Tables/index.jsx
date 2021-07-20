import React, { useContext, useEffect } from "react";
import Table from "./Table";
import { CategoryDataContext, SET_NODES } from "../../Data";
import "./index.css";
export default function Tables() {
  const { data, dispatch } = useContext(CategoryDataContext);
  const { nodeId, components } = data;

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      console.log(
        sender.tab ? "来自内容脚本：" + sender.tab.url : "来自扩展程序"
      );
      if (request.sign == "Nodes") {
        sendResponse({ farewell: "tables.jsx接收到" });
        dispatch({ type: SET_NODES, data: { nodes: request.nodes } });
      }
    });
    return () => {};
  }, []);
console.log(components, 123)
  return components
    ? components.map((item, index) => (
        <Table component={item} componentId={index} nodeId={nodeId} />
      ))
    : null;
}
