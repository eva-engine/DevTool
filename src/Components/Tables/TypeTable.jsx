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
  const sendMessageToContentScript = function (message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        if (callback) callback(response);
      });
    });
  };
  const sendKeyAndValue = function (key, value) {
    sendMessageToContentScript(
      {
        cmd: "test",
        key: key,
        value: value,
      },
      function (response) {
        console.log("来自content回复：" + response);
      }
    );
  };
  const handleChange = function (inputValue, propertyName, secondKey = null) {
    // 此处添加setValue数值更改更丝滑
    setValue(inputValue);

    if (secondKey) {
      component[propertyName]["value"][secondKey] = inputValue;
      sendKeyAndValue(
        `${propertyName}.${secondKey}-${nodeId}-${componentId}`,
        inputValue
      );
    } else {
      component[propertyName]["value"] = inputValue;
      sendKeyAndValue(`${propertyName}-${nodeId}-${componentId}`, inputValue);
    }
  };
  const handleBooleanChange = function (inputValue, propertyName) {
    setValue(inputValue);
    component[propertyName]["value"] = inputValue;
    sendKeyAndValue(`${propertyName}-${nodeId}-${componentId}`, inputValue);
  };
  return (
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
              {component[propertyName].type === "vector2" ? (
                <>
                  <span className="propertyX">x: </span>
                  <InputNumber
                    key={`${propertyName}.x-${nodeId}-${componentId}`}
                    defaultValue={`${component[propertyName].value.x}`}
                    value={component[propertyName].value.x}
                    onChange={(value) => handleChange(value, propertyName, "x")}
                    step={component[propertyName]?.step}
                  />
                  <span className="propertyY">y: </span>
                  <InputNumber
                    key={`${propertyName}.y-${nodeId}-${componentId}`}
                    defaultValue={`${component[propertyName].value.y}`}
                    value={component[propertyName].value.y}
                    onChange={(value) => handleChange(value, propertyName, "y")}
                    step={component[propertyName]?.step}
                  />
                </>
              ) : component[propertyName].type === "number" ? (
                <InputNumber
                  key={`${propertyName}-${nodeId}-${componentId}`}
                  defaultValue={`${component[propertyName].value}`}
                  value={component[propertyName].value}
                  onChange={(value) => handleChange(value, propertyName)}
                  step={component[propertyName]?.step}
                />
              ) : component[propertyName].type === "boolean" ? (
                <Switch
                  defaultChecked
                  key={`${propertyName}-${nodeId}-${componentId}`}
                  onChange={(value) => handleBooleanChange(value, propertyName)}
                />
              ) : component[propertyName].type === "size" ? (
                <>
                  <span className="propertyX">width: </span>
                  <InputNumber
                    key={`${propertyName}.width-${nodeId}-${componentId}`}
                    defaultValue={`${component[propertyName].value.width}`}
                    value={component[propertyName].value.width}
                    onChange={(value) =>
                      handleChange(value, propertyName, "width")
                    }
                    step={component[propertyName]?.step}
                  />
                  <span className="propertyY">height: </span>
                  <InputNumber
                    key={`${propertyName}.height-${nodeId}-${componentId}`}
                    defaultValue={`${component[propertyName].value.height}`}
                    value={component[propertyName].value.height}
                    onChange={(value) =>
                      handleChange(value, propertyName, "height")
                    }
                    step={component[propertyName]?.step}
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
