import React, { useState, useContext } from "react";
import { Card, InputNumber, Input, Switch } from "antd";

import { CategoryDataContext } from "../../Data";

import "./index.css";

export default function MutipleType(props) {
  const { data } = useContext(CategoryDataContext);
  const { IDEProp } = data;

  const comopentProperties = Object.keys(props.component);
  const component = props.component;
  const componentId = props.componentId;
  //   const component = componentKeepType[componentId];
  const nodeId = props.nodeId;
  const [value, setValue] = useState(0);
  const [key, setKey] = useState("");

  const handleChange = function (e, propertyName) {
    setValue(e);
    setKey(`${propertyName}-${nodeId}-${componentId}`);
    component[propertyName] = e;
    function sendMessageToContentScript(message, callback) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
          if (callback) callback(response);
        });
      });
    }
    sendMessageToContentScript(
      {
        cmd: "test",
        key: `${propertyName}-${nodeId}-${componentId}`,
        value: e,
      },
      function (response) {
        console.log("来自content回复：" + response);
      }
    );
  };
  return (
    // <div>{
    //   console.log(component)
    // }</div>
    <Card
      key={`${nodeId}-${componentId}`}
      title={component["name"]}
    >
      {comopentProperties
        .filter((propertyName) => propertyName !== "name")
        .map((propertyName) => {
            console.log(component[propertyName])
        }
        //   <div className="tableContentWrapper" key={propertyName + "wrapper"}>
        //     <span
        //       key={propertyName + "key"}
        //       className="key"
        //     >{`${propertyName}`}</span>
        //     <span className="propertyInput" key={propertyName + "input"}>
        //       {IDEProp[componentId][propertyName].type === "vector2" ? (
        //         <>
        //           <span className="propertyX">:</span>
        //           <InputNumber
        //             key={`${propertyName}.x-${nodeId}-${componentId}`}
        //             defaultValue={component[propertyName].x}
        //             value={component[propertyName].x}
        //             onChange={(e) => handleChange(e, propertyName)}
        //           />
        //           <span className="propertyY">y: </span>
        //           <InputNumber
        //             key={`${propertyName}.y-${nodeId}-${componentId}`}
        //             defaultValue={component[propertyName].y}
        //             value={component[propertyName].y}
        //             onChange={(e) => handleChange(e, propertyName)}
        //           />
        //         </>
        //       ) : null}
        //     </span>
        //   </div>
        
        )}
    </Card>
  );
}
