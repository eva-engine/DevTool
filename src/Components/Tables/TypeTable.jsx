import React, { useState } from "react";
import { Card, InputNumber, Input, Switch } from "antd";
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

  const buildInputItemByType = function (propertyName, perciseKey) {
    if (perciseKey) {
      return {
        key: `${propertyName}.${perciseKey}-${nodeId}-${componentId}`,
        defaultValue: `${component[propertyName].value[perciseKey]}`,
        value: component[propertyName].value[perciseKey],
        onChange: (value) => handleChange(value, propertyName, perciseKey),
        step: component[propertyName]?.step,
      };
    } else {
      return {
        key: `${propertyName}-${nodeId}-${componentId}`,
        defaultValue: `${component[propertyName].value}`,
        value: component[propertyName].value,
        onChange: (value) => handleChange(value, propertyName),
        step: component[propertyName]?.step,
      };
    }
  };

  const buildInputByType = function (type, propertyName) {
    return type === "vector2" ? (
      <>
        <span className="propertyX">x: </span>
        <InputNumber {...buildInputItemByType(propertyName, "x")} />
        <span className="propertyY">y: </span>
        <InputNumber {...buildInputItemByType(propertyName, "y")} />
      </>
    ) : type === "number" ? (
      <InputNumber {...buildInputItemByType(propertyName)} />
    ) : type === "boolean" ? (
      <Switch
        defaultChecked
        key={`${propertyName}-${nodeId}-${componentId}`}
        onChange={(value) => handleBooleanChange(value, propertyName)}
      />
    ) : type === "size" ? (
      <>
        <span className="propertyX">width: </span>
        <InputNumber {...buildInputItemByType(propertyName, "width")} />
        <span className="propertyY">height: </span>
        <InputNumber {...buildInputItemByType(propertyName, "height")} />
      </>
    ) : (
      <Input {...buildInputItemByType(propertyName)} />
    );
  };

  return (
    <Card key={`${nodeId}-${componentId}`} title={component["name"]}>
      {comopentProperties
        .filter((propertyName) => propertyName !== "name")
        .map((propertyName) => (
          <div
            className="tableContentItemWrapper"
            key={propertyName + "wrapper"}
          >
            <span
              key={propertyName + "key"}
              className="key"
            >{`${propertyName}`}</span>
            <span className="propertyInput" key={propertyName + "input"}>
              {buildInputByType(component[propertyName].type, propertyName)}
            </span>
          </div>
        ))}
    </Card>
  );
}
