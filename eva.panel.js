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
      function App() {
        function toList(obj) {
          var items = Object.keys(obj).map(function (key) {
            var value = obj[key];

            if (Array.isArray(value)) {
              return value.map(function (obj) {
                return toList(obj);
              });
            } else {
              return React.createElement(
                "li",
                null,
                "".concat(key, ": ").concat(obj[key])
              );
            } // }
          });
          return React.createElement("ul", null, items);
        }

        return React.createElement("div", null, toList(outliner));
      }

      const domContainer = document.querySelector("#App");
      ReactDOM.render(e(App), domContainer);
    }
  });
});
