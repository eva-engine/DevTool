import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Tree, Input } from "antd";

const { Search } = Input;

const gData = [
  {
    key: "0-1",
    title: "first",
    children: [
      {
        key: "0-1-1",
        title: "f-s",
        children: [
          {
            key: "0-1-1-1",
            title: "f-s"
          },
          {
            key: "0-1-2-1",
            title: "f-t"
          }
        ]
      },
      {
        key: "0-1-2",
        title: "f-t"
      }
    ]
  },
  {
    key: "1-1",
    title: "second",
    children: [
      {
        key: "1-1-1",
        title: "s-s"
      },
      {
        key: "1-1-2",
        title: "s-t"
      }
    ]
  }
];

const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

export default class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: "",
    autoExpandParent: true
  };

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  onChange = (e) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    });
  };

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = (data) =>
      data.map((item) => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
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
          key: item.key
        };
      });
    return (
      <div>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="Search"
          onChange={this.onChange}
        />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={loop(gData)}
        />
      </div>
    );
  }
}
