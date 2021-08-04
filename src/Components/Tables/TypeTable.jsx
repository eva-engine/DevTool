import React, { useState, useContext } from "react";
import { Card, InputNumber, Input, Switch } from "antd";
import { CategoryDataContext } from "../../Data";

import "./index.css";

export default function TypeTable(props) {
  const comopentProperties = Object.keys(props.component);
  const component = props.component;
  const componentId = props.componentId;
  const nodeId = props.nodeId;
  const [value, setValue] = useState(0);
  const [key, setKey] = useState("");
  const handleChange = function (value, propertyName, secondKey=null) {
    setValue(value);
    if (secondKey) {
      component[propertyName]["value"][secondKey] = value;
      sendKey(`${propertyName}.${secondKey}-${nodeId}-${componentId}`);
    } else {
      component[propertyName]["value"] = value;
      sendKey(`${propertyName}-${nodeId}-${componentId}`);
    }
    function sendMessageToContentScript(message, callback) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
          if (callback) callback(response);
        });
      });
    }
    function sendKey(key) {
      sendMessageToContentScript(
        {
          cmd: "test",
          //   key: `${propertyName}-${nodeId}-${componentId}`,
          key: key,
          value: value,
        },
        function (response) {
          console.log("来自content回复：" + response);
        }
      );
    }
  };
  return (
    // <div>{
    //   console.log(comopentProperties)
    // }</div>
    <Card key={`${nodeId}-${componentId}`} title={component["name"]}>
      {comopentProperties
        .filter((propertyName) => propertyName !== "name")
        .map((propertyName) => (
          <div className="tableContentWrapper" key={propertyName + "wrapper"}>
            <span
              key={propertyName + "key"}
              className="key"
            >{`${propertyName}`}</span>
            <span className="propertyInput" key={propertyName + "input"}>
              {/* <InputType
                keyProp={`${propertyName}-${nodeId}-${componentId}`}
                type={component[propertyName].type}
                value={`${component[propertyName].value}`}
                onChange={(value) => handleChange(value, propertyName)}
              /> */}
              {component[propertyName].type === "vector2" ? (
                <>
                  <span className="propertyX">x: </span>
                  <InputNumber
                    key={`${propertyName}.x-${nodeId}-${componentId}`}
                    defaultValue={`${component[propertyName].value.y}`}
                    value={component[propertyName].value.x}
                    onChange={(value) => handleChange(value, propertyName, "x")}
                  />
                  <span className="propertyY">y: </span>
                  <InputNumber
                    key={`${propertyName}.y-${nodeId}-${componentId}`}
                    defaultValue={`${component[propertyName].value.y}`}
                    value={component[propertyName].value.y}
                    onChange={(value) => handleChange(value, propertyName, "y")}
                  />
                </>
              ) : component[propertyName].type === "number" ? (
                <InputNumber
                  key={`${propertyName}-${nodeId}-${componentId}`}
                  defaultValue={`${component[propertyName].value}`}
                  value={component[propertyName].value}
                  onChange={(value) => handleChange(value, propertyName)}
                />
              ) : component[propertyName].type === "boolean" ? (
                <Switch
                  defaultChecked
                  key={`${propertyName}-${nodeId}-${componentId}`}
                  //   defaultValue={`${component[propertyName].value}`}
                  //   value={component[propertyName].value}
                  onChange={(value) => handleChange(value, propertyName)}
                />
              ) : component[propertyName].type === "size" ? (
                <>
                  <span className="propertyX">width: </span>
                  <InputNumber
                    key={`${propertyName}.width-${nodeId}-${componentId}`}
                    defaultValue={`${component[propertyName].value.width}`}
                    value={component[propertyName].value.width}
                    onChange={(value) => handleChange(value, propertyName, "width")}
                  />
                  <span className="propertyY">height:{" "}</span>
                  <InputNumber
                    key={`${propertyName}.height-${nodeId}-${componentId}`}
                    defaultValue={`${component[propertyName].value.height}`}
                    value={component[propertyName].value.height}
                    onChange={(value) => handleChange(value, propertyName, "height")}
                  />
                </>
              ) : (
                <Input
                  key={`${propertyName}-${nodeId}-${componentId}`}
                  defaultValue={`${component[propertyName].value}`}
                  value={component[propertyName].value}
                  onChange={(value) => handleChange(value, propertyName)}
                />
              )}
            </span>
          </div>
        ))}
    </Card>
  );
}
