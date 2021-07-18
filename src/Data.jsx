import React, { createContext, useReducer } from "react";

//context
export const CategoryDataContext = createContext({});

// 相当于之前的 constants
export const CHANGE_NODE_ID = "changeNodeId";

//reducer 纯函数
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_NODE_ID:
        // return state = action.data
      return  action.data;
    default:
      return state;
  }
};

//Provider 组件
export default function Data(props){
  //useReducer 的第二个参数中传入初始值
  const [data, dispatch] = useReducer(reducer, {
    nodeId: 1,
  });
  return (
    <CategoryDataContext.Provider value={{ data, dispatch }}>
      {props.children}
    </CategoryDataContext.Provider>
  );
};
