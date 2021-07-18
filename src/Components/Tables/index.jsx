import "./index.css";
import React,{useContext} from "react";
import Table from "./Table";
import { CategoryDataContext } from "../../Data";

export default function Tables(props) {
  // let arr = props.arr[1].components;
  let arr = props.arr;
  let objId = 2;
  const { data, dispatch } = useContext(CategoryDataContext);
  console.log('nodeId', data);
  objId = nodeId;
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
  //       setArr(request.tree.nodes[1].components);
  //       // arr = request.tree.nodes[1].components;
  //       console.log('request', request.tree);
  //     }
  //   });
  // }, []);

  return arr.map((item, index) => (
    <Table obj={item} component={index} objId={objId} />
  ));
}
