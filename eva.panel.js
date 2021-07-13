document.addEventListener("DOMContentLoaded", function () {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(
      sender.tab ? "来自内容脚本：" + sender.tab.url : "来自扩展程序"
    );
    if (request.sign == "EvaDevtool") {
      sendResponse({ farewell: "欢迎使用EvaDvetool" });
      let nodes = request.tree.nodes;
      let outliner = request.tree.outliner;
      ("use strict");

      const e = React.createElement;
      // function App() {
      // //   function toList(obj) {
      // //     var items = Object.keys(obj).map(function (key) {
      // //       // if(obj.hasOwnProperty(key)){
      // //       var value = obj[key];

      // //       if (Array.isArray(value)) {
      // //         return value.map(function (obj) {
      // //           return toList(obj);
      // //         });
      // //       }

      // //       if (key === "title" || key === "id") {
      // //         return React.createElement(
      // //           "li",
      // //           null,
      // //           "".concat(key, ": ").concat(obj[key])
      // //         );
      // //       }
      // //     });
      // //     return React.createElement("ul", null, items);
      // //   }

      //   return React.createElement("div", null, toList(outliner));
      // }
      function Tables(props) {
        var arr = props.arr;
        let objId = props.objId;
        return arr.map(function (item, index) {
          return React.createElement(Table, {
            obj: item,
            component: index,
            objId: objId,
          });
        });
      }

      function Table(props) {
        var arr = Object.keys(props.obj);
        var obj = props.obj;
        const objId = props.objId;
        const componentId = props.component;

        const [value, setValue] = React.useState();
        const [key, setKey] = React.useState();

        function useDebounce(fn, delay, dep = []) {
          const { current } = React.useRef({ fn, timer: null });

          React.useEffect(
            function () {
              current.fn = fn;
            },
            [fn]
          );

          return React.useCallback(function f(e) {
            e.persist();
            if (current.timer) {
              clearTimeout(current.timer);
            }

            current.timer = setTimeout(() => {
              current.fn.call(this, e);
            }, delay);
          }, dep);
        }
        const handleChange = useDebounce(function (e) {
          setValue(e.target.value);
          setKey(e.target.className);
        }, 300);

        const handleBlur = function () {
          function sendMessageToContentScript(message, callback) {
            chrome.tabs.query(
              { active: true, currentWindow: true },
              function (tabs) {
                chrome.tabs.sendMessage(
                  tabs[0].id,
                  message,
                  function (response) {
                    if (callback) callback(response);
                  }
                );
              }
            );
          }
          if(value){
            sendMessageToContentScript(
              { cmd: "test", key: key, value: value },
              function (response) {
                console.log("来自content的回复：" + response);
              }
            );
          }
        };
        return React.createElement(
          "table",
          null,
          React.createElement(
            "thead",
            null,
            arr.map(function (key) {
              let uid = `${objId}-${componentId}-${key}`;
              return React.createElement(
                "tr",
                { key: `${uid}`},
                React.createElement(
                  "td",
                  {
                    key: `${uid}-key`,
                    className: "key",
                  },
                  "".concat(key)
                ),
                React.createElement("td", { key: `${uid}-:` }, ":"),
                React.createElement(
                  "td",
                  { key: `${uid}-input` },
                  React.createElement("input", {
                    placeholder: "".concat(obj[key]),
                    onChange: function onChange(e) {
                      return handleChange(e);
                    },
                    onFocus: function onFocus(e) {
                      e.target.placeholder = "";
                    },
                    onBlur: function onBlur(e) {
                      handleBlur();
                      if (!e.target.value) {
                        e.target.placeholder = obj[key];
                      }
                    },
                    className: `${objId}-${componentId}-${key}`,
                  })
                )
              );
            })
          )
        );
      }

      // babel编译后的react Table

      const domContainer = document.querySelector("#Table");
      let obj = [
        {
          h: "hello",
          b: "back",
        },
        {
          h: "hello",
          b: "back",
        },
      ];

      // ReactDOM.render(e(Tables, { arr: obj }), domContainer);

      layui.use("tree", function () {
        var tree = layui.tree;
        console.log("tree", outliner);
        //渲染
        var inst1 = tree.render({
          elem: "#tree", //绑定元素
          data: [outliner],
          click: function (obj) {
            let id = obj.data.id;
            ReactDOM.render(
              e(Tables, { arr: nodes[id].components, objId: id }),
              domContainer
            );

            // console.log(nodes[obj.data.id].components);
          },
        });
      });

      // layui.use(["table", "util"], function () {
      //   var table = layui.table,
      //     util = layui.util;

      //   //监听单元格编辑
      //   table.on("edit(test3)", function (obj) {
      //     var value = obj.value, //得到修改后的值
      //       data = obj.data, //得到所在行所有键值
      //       field = obj.field; //得到字段
      //     layer.msg(
      //       "[ID: " +
      //         data.id +
      //         "] " +
      //         field +
      //         " 字段更改值为：" +
      //         util.escape(value)
      //     );
      //   });
      // });
    }
  });
});
