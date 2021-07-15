import "./index.css";
import React, { useState,useEffect } from "react";
import Table from "./Table";
export default function Tables(props) {
  // let arr = props.arr;
  // const [arr, setArr] = useState(props.arr);
  let arr = props.arr;
  let objId = props.objId;
  // useEffect(() => {
  //   chrome.runtime.onMessage.addListener(function (
  //     request,
  //     sender,
  //     sendResponse
  //   ) {
  //     console.log(
  //       sender.tab ? "来自内容脚本：" + sender.tab.url : "来自扩展程序"
  //     );
  //     if (request.sign == "EvaDevtool") {
  //       sendResponse({ farewell: "Tables" });
  //       // setArr(request.tree.nodes[0].components);
  //     }
  //   });
  // }, []);
  return arr.map((item, index) => (
    <Table obj={item} component={index} objId={objId} />
  ));
}
