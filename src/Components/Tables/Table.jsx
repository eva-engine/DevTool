import React, { useState } from "react";
import { Card, InputNumber } from "antd";

import "./index.css";

export default function Table(props) {
  const comopentProperties = Object.keys(props.component);
  const component = props.component;
  const componentId = props.componentId;
  const nodeId = props.nodeId;
  const [value, setValue] = useState(0);
  const [key, setKey] = useState("");

  const handleChange = function (e, propertyName) {
    setValue(e);
    setKey(`${propertyName}-${nodeId}-${componentId}`);
  };

  const handleBlur = function (propertyName) {
    component[propertyName] = value;
    console.log(key, value);
    function sendMessageToContentScript(message, callback) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
          if (callback) callback(response);
        });
      });
    }
    if (value && key) {
      sendMessageToContentScript(
        { cmd: "test", key: key, value: value },
        function (response) {
          console.log("来自content回复：" + response);
        }
      );
    }
    setKey("");
    setValue(undefined);
  };
  return (
    <Card key={`${nodeId}-${componentId}`} title={component.name}>
      {comopentProperties
        .filter((propertyName) => propertyName !== "name")
        .map((propertyName) => (
          <div className="tableContentWrapper" key={propertyName+'wrapper'}>
            <span key={propertyName + "key"} className="key">{`${propertyName}`}</span>
            <span className="propertyInput" key={propertyName + "input"}>
              <InputNumber
                key={`${propertyName}-${nodeId}-${componentId}`}
                defaultValue={`${component[propertyName]}`}
                onChange={(e) => handleChange(e, propertyName)}
                min={-2000}
                max={2000}
                onBlur={(e) => {
                  handleBlur(propertyName);
                }}
              />
            </span>
          </div>
        ))}
    </Card>
  );
}
