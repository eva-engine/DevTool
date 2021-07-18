import React, { useEffect, useState,useContext } from "react";
import { Tree, Input } from "antd";
import { getParentKey } from "./util";
import { CategoryDataContext } from "../../Data";

import "antd/dist/antd.css";
import "./index.css";
import { CHANGE_NODE_ID } from "../../Data";

const { Search } = Input;

const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data?.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children);
    }
  }
};

export default function SearchTree(props) {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  // const [nodeId, setNodeId] = useState(1);
  const gData = props.gData;
  const { data, dispatch } = useContext(CategoryDataContext);
  const { nodeId } = data;

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  useEffect(() => {
    generateList(gData);
  }, []);

  const loop = (data) =>
    data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span
            onClick={() => {
              dispatch({ type: CHANGE_NODE_ID, data: item.id });
              // updateDispatch(nodeId, item.id);
            }}
          >
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });

  return (
    <div>
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={loop(gData)}
      />
    </div>
  );
}
