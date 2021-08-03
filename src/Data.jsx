import React, { createContext, useReducer } from "react";

//context
export const CategoryDataContext = createContext({});

// 相当于之前的 constants
export const CHANGE_NODE_ID = "changeNodeId";
export const INIT_DEVTOOL = "initDevTool";
export const SET_COMPONENTS = "setComponents";
export const SET_NODES = "setNodes";

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_NODE_ID:
      return {
        ...state,
        nodeId: action.data.nodeId,
        components: state.nodes[action.data.nodeId].components,
      };
    case INIT_DEVTOOL:
      return {
        ...state,
        components: action.data.initComponents,
        nodes: action.data.nodes,
        gData: action.data.gData,
      };
    case SET_COMPONENTS:
      return {
        ...state,
        components: action.data.components,
      };
    case SET_NODES:
      return {
        ...state,
        nodes: action.data.nodes,
        components: action.data.nodes[state.nodeId].components,
        componentsKeepType: action.data.nodes[state.nodeId].componetsKeepType,
        IDEProp: action.data.nodes[state.nodeId].IDEProp,
      };
    default:
      return state;
  }
};

export default function Data(props) {
  const [data, dispatch] = useReducer(reducer, {
    nodeId: 1,
  });

  return (
    <CategoryDataContext.Provider value={{ data, dispatch }}>
      {props.children}
    </CategoryDataContext.Provider>
  );
}
