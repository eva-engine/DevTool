import React from "react";

import { InputNumber, Switch, Input } from "antd";

export default function InputType(props) {
  const [type, keyProp, value, onChange, onBlur] = props;
  console.log('props',props);
  switch (type) {
    case "number":
      return (
        <>
          <div>{keyProp}</div>
          <InputNumber
            onChange={onChange}
            defaultValue={value}
            value={value}
            key={keyProp}
          />
        </>
      );
    case "vector2":
      return (
        <>
          <span>x:</span>
          <InputNumber
            onChange={onChange}
            defaultValue={value.x}
            value={value.x}
            key={"x." + keyProp}
          />
          <span>y:</span>
          <InputNumber
            onChange={onChange}
            defaultValue={value.y}
            value={value.y}
            key={"y." + keyProp}
          />
        </>
      );
    case "boolean":
      return value === true ? <Switch defaultChecked /> : <Switch />;
    case "string":
      return (
        <>
          <Input
            onChange={onChange}
            defaultValue={value}
            value={value}
          />
        </>
      );
    default:
      return null;
  }
}
