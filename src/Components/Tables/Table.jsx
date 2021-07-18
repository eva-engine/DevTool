import "./index.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { Card,InputNumber } from "antd";

export default function Table(props) {
  let arr = Object.keys(props.obj);
  let obj = props.obj;
  let component = props.component;
  let objId = props.objId;
  const [value, setValue] = useState();
  const [key, setKey] = useState();

  const handleChange = function (e) {
    // setValue(e.target.value);
    // setKey(e.target.className);
  };

  const handleBlur = function () {
    console.log(key, value);
    function sendMessageToContentScript(message, callback) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
          if (callback) callback(response);
        });
      });
    }
    if (value) {
      sendMessageToContentScript(
        { cmd: "test", key: key, value: value },
        function (response) {
          console.log("来自content的回复：" + response);
        }
      );
    }
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
                onChange={(e) => handleChange(e)}
                min={-2000}
                max={2000}
                // onFocus={(e) => {
                //   e.target.placeholder = "";
                // }}
                onBlur={(e) => {
                  handleBlur();
                  // if (!e.target.value) {
                  //   e.target.placeholder = obj[key];
                  // }
                }}
                // className={`${key}-${objId}-${component}`}
              />
            </span>
          </div>
        ))}
    </Card>
  );
}
