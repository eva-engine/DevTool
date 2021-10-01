import React, { useContext, useEffect } from "react";
import TypeTable from "./TypeTable";
import { CategoryDataContext, SET_NODES } from "../../Data";
import "./index.css";
export default function Tables() {
  const { data, dispatch } = useContext(CategoryDataContext);
  const { nodeId, componentsKeepType } = data;

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (request.sign == "Nodes") {
        dispatch({ type: SET_NODES, data: { nodes: request.nodes } });
        sendResponse({ farewell: "Tables" });
      }
    });
    return () => {};
  }, []);
  return componentsKeepType
    ? componentsKeepType.map((item, index) => (
        <TypeTable 
        component={item} 
        componentId={index} nodeId={nodeId} />
      ))
    : null;

}
