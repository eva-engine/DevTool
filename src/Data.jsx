import React, { createContext, useReducer } from "react";

export const CategoryDataContext = createContext({});

export const CHANGE_NODE_ID = "changeNodeId";
export const INIT_DEVTOOL = "initDevTool";
export const SET_COMPONENTS = "setComponents";
export const SET_NODES = "setNodes";
export const SET_OUTLINER = "setOutliner";

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_NODE_ID:
      return {
        ...state,
        nodeId: action.data.nodeId,
        componentsKeepType: state.nodes[action.data.nodeId].componentsKeepType,
      };
    case INIT_DEVTOOL:
      return {
        ...state,
        componentsKeepType: action.data.initComponents,
        nodes: action.data.nodes,
        gData: action.data.gData,
      };
    case SET_NODES:
      return {
        ...state,
        nodes: action.data.nodes,
        componentsKeepType: action.data.nodes[state.nodeId].componetsKeepType,
      };
    case SET_OUTLINER:
      return {
        ...state,
        gData: action.data.outliner,
        nodes: action.data.nodes
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
