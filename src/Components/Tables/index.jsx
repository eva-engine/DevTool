import "./index.css";
import React, { useContext, useEffect } from "react";
import Table from "./Table";
import { CategoryDataContext } from "../../Data";

export default function Tables(props) {
  let nodes = props.nodes;
  let components = props.initComponents;
  let objId = 2;
  const { data, dispatch } = useContext(CategoryDataContext);
  
  useEffect(()=>{
    console.log("nodeId", data);
    if(nodes.length>0){components = nodes[data].components;}
  },[data])

  return components.map((item, index) => (
    <Table obj={item} component={index} objId={objId} />
  ));
}
