import React from "react";

import { InputNumber, Switch, Input } from "antd";

export default function InputType(props) {
  const [type,  component, onChange,xKey,yKey,onChangeX,onChangeY] = props;

  switch (type) {
    case "vector2":
      return (
        <>
          <span className="propertyX">x: </span>
          <InputNumber
            key={xKey}
            defaultValue={`${component.value.x}`}
            value={component.value.x}
            onChange={onChangeX}
            step={component?.step}
          />
          <span className="propertyY">y: </span>
          <InputNumber
            key={yKey}
            defaultValue={`${component.value.y}`}
            value={component.value.y}
            onChange={onChangeY}
            step={component?.step}
          />
        </>
      );
    case "number":
      return (
        <InputNumber
          key={`${propertyName}-${nodeId}-${componentId}`}
          defaultValue={`${component[propertyName].value}`}
          value={component[propertyName].value}
          onChange={(value) => handleChange(value, propertyName)}
          step={component[propertyName]?.step}
        />
      );
    case "boolean":
      return (
        <Switch
          defaultChecked
          key={`${propertyName}-${nodeId}-${componentId}`}
          onChange={(value) => handleBooleanChange(value, propertyName)}
        />
      );
      break;
    case "size":
      return (
        <>
          <span className="propertyX">width: </span>
          <InputNumber
            key={`${propertyName}.width-${nodeId}-${componentId}`}
            defaultValue={`${component[propertyName].value.width}`}
            value={component[propertyName].value.width}
            onChange={(value) => handleChange(value, propertyName, "width")}
            step={component[propertyName]?.step}
          />
          <span className="propertyY">height: </span>
          <InputNumber
            key={`${propertyName}.height-${nodeId}-${componentId}`}
            defaultValue={`${component[propertyName].value.height}`}
            value={component[propertyName].value.height}
            onChange={(value) => handleChange(value, propertyName, "height")}
            step={component[propertyName]?.step}
          />
        </>
      );
    default:
      return (
        <Input
          key={`${propertyName}-${nodeId}-${componentId}`}
          defaultValue={`${component[propertyName].value}`}
          value={component[propertyName].value}
          onChange={(value) => handleChange(value, propertyName)}
        />
      );
  }
}
