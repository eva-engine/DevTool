import "./index.css";
import React, { useContext, useEffect } from "react";
import Table from "./Table";
import { CategoryDataContext } from "../../Data";

export default function Tables(props) {
  let nodes = props.nodes;
  let objId = 2;
  let arr;
  const { data, dispatch } = useContext(CategoryDataContext);
  // let arr = props.arr[data].components;
  useEffect(()=>{
    console.log("nodeId", data);
  },[data])

  return nodes.map((item, index) => (
    <Table obj={item} component={index} objId={objId} />
  ));
}
