import React, { createContext, useReducer } from "react";

//context
export const CategoryDataContext = createContext({});

// 相当于之前的 constants
export const CHANGE_NODE_ID = "changeNodeId";
export const INIT_DEVTOOL = "initDevTool";
export const SET_COMPONENTS = 'setComponents';

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_NODE_ID:
      return { ...state, nodeId: action.data.nodeId };
    case INIT_DEVTOOL:
      return {
        ...state,
        components: action.data.initComponents,
        nodes: action.data.nodes,
        gData: action.data.gData,
      };
    case SET_COMPONENTS:
      return{
        ...state, 
        components: action.data.components
      }
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
