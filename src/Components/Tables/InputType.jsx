import React from "react";

import { InputNumber, Switch, Input } from "antd";

export default function InputType(props) {
  const [type, keyProp, value,id] = props;
  switch (type) {
    case "number":
      return (
        <>
          <div>{keyProp}</div>
          <InputNumber defaultValue={value} value={value} key={id} />
        </>
      );
    case "vector2":
      return (
        <>
          <span>x:</span>
          <InputNumber defaultValue={value.x} value={value.x} />
          <span>y:</span>
          <InputNumber defaultValue={value.y} value={value.y} />
        </>
      );
    case "boolean":
      return (
        <div>
          <Switch defaultChecked />
        </div>
      );
    case "string":
      return (
        <>
          <Input defaultValue={value} value={value} />
        </>
      );
    default:
      return null;
  }
}
