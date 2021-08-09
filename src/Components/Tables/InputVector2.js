import React from "react";
export default function InputVector(props) {
  const [nodeId, componentId, component, name,handleChange] = props;
  return (
    <>
      <span className="propertyX">x: </span>
      <InputNumber
        key={`${name}.x-${nodeId}-${componentId}`}
        defaultValue={`${component.value.x}`}
        value={component.value.x}
        onChange={(value) => handleChange(value, name, "x")}
        step={component?.step}
      />
      <span className="propertyY">y: </span>
      <InputNumber
        key={`${name}.y-${nodeId}-${componentId}`}
        defaultValue={`${component.value.y}`}
        value={component.value.y}
        onChange={(value) => handleChange(value, name, "y")}
        step={component?.step}
      />
    </>
  );
}
