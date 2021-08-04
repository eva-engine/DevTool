import React, { useContext, useEffect } from "react";
import Table from "./Table";
import TypeTable from "./TypeTable";
import MutipleType from './MutipleType'
import { CategoryDataContext, SET_NODES } from "../../Data";
import "./index.css";
export default function Tables() {
  const { data, dispatch } = useContext(CategoryDataContext);
  const { nodeId, components, componentsKeepType, IDEProp } = data;

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (request.sign == "Nodes") {
        dispatch({ type: SET_NODES, data: { nodes: request.nodes } });
      }
    });
    return () => {};
  }, []);
  // return componentsKeepType
  //   ? componentsKeepType.map((item, index) => (
  //       <MutipleType
  //       component={item} 
  //       componentId={index} nodeId={nodeId} />
  //     ))
  //   : null;

  return componentsKeepType
    ? componentsKeepType.map((item, index) => (
        <TypeTable 
        component={item} 
        componentId={index} nodeId={nodeId} />
      ))
    : null;

  // return components
  //   ? components.map((item, index) => (
  //       <Table component={item} componentId={index} nodeId={nodeId} />
  //     ))
  //   : null;
}
