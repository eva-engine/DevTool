import React, { useContext, useEffect } from "react";
import Table from "./Table";
import { CategoryDataContext, SET_COMPONENTS } from "../../Data";
import "./index.css";

export default function Tables() {
  const { data } = useContext(CategoryDataContext);
  const { nodeId, components } = data;

  return components
    ? components.map((item, index) => (
        <Table component={item} componentId={index} nodeId={nodeId} />
      ))
    : null;
}
