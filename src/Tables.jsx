import "./table.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
export default function Tables(props) {
  let arr = props.arr;
  let objId = props.objId;
  console.log(arr);
  return arr.map((item, index) => (
    <Table obj={item} component={index} objId={objId} />
  ));
}

function Table(props) {
  let arr = Object.keys(props.obj);
  let obj = props.obj;
  let component = props.component;
  let objId = props.objId;
  const [value, setValue] = useState();
  const [key, setKey] = useState();

  const handleChange = function (e) {
    setValue(e.target.value);
    setKey(e.target.className);
  };

  const handleBlur = function () {
    console.log(key, value);
  };
  return (
    <table>
      <thead>
        <tr className="tableName">{obj.name}</tr>
        {arr
          .filter((key) => key !== "name")
          .map((key) => (
            <tr key={key}>
              <td key={key + "key"} className="key">{`${key}`}</td>
              <td key={key + "input"}>
                <input
                  placeholder={`${obj[key]}`}
                  onChange={(e) => handleChange(e)}
                  onFocus={(e) => {
                    e.target.placeholder = "";
                  }}
                  onBlur={(e) => {
                    handleBlur();
                    if (!e.target.value) {
                      e.target.placeholder = obj[key];
                    }
                  }}
                  className={`${key}-${objId}-${component}`}
                />
              </td>
            </tr>
          ))}
      </thead>
    </table>
  );
}
