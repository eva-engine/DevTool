import "./index.css";
import React, { useContext, useEffect } from "react";
import Table from "./Table";
import { CategoryDataContext, SET_COMPONENTS } from "../../Data";

export default function Tables() {
  const { data, dispatch } = useContext(CategoryDataContext);
  const { nodes, nodeId, components } = data;

  useEffect(() => {
    if (nodes) {
      dispatch({
        type: SET_COMPONENTS,
        data: { components: nodes[nodeId].components },
      });
    }
  }, [nodeId]);

  return components
    ? components.map((item, index) => (
        <Table obj={item} componentId={index} objId={nodeId} />
      ))
    : null;
}
