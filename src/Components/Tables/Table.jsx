import "./index.css";
import React, { useState } from "react";
import { Card,InputNumber } from "antd";

export default function Table(props) {
  let arr = Object.keys(props.obj);
  let obj = props.obj;
  let component = props.component;
  let objId = props.objId;
  const [value, setValue] = useState(0);
  const [key, setKey] = useState('');

  const handleChange = function (e,itemKey) {
    setValue(e);
    setKey(`${itemKey}-${objId}-${component}`);
  };

  const handleBlur = function (itemKey) {
    
    obj[itemKey] = value;
    console.log(key, value);
    function sendMessageToContentScript(message, callback) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
          if (callback) callback(response);
        });
      });
    }
    if (value&&key) {
      sendMessageToContentScript(
        { cmd: "test", key: key, value: value },
        function (response) {
          console.log("来自content回复：" + response);
        }
      );
    }
    setKey('');
    setValue(undefined);
  };
  return (
    <Card key={key} title={obj.name}>
      {arr
        .filter((key) => key !== "name")
        .map((key) => (
          <div className="tableContentWrapper" key={key}>
            <span key={key + "key"} className="key">{`${key}`}</span>
            <span className="propertyInput" key={key + "input"}>
              <InputNumber
                defaultValue={`${obj[key]}`}
                onChange={(e) => handleChange(e,key)}
                min={-2000}
                max={2000}
                onBlur={(e)=>{
                  handleBlur(key)
                }}
              />
            </span>
          </div>
        ))}
    </Card>
  );
}
