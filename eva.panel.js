function toHtmlList(obj) {
  let temp = "<ul>";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];
      if (Array.isArray(value)) {
        temp += `<li>${key}: `;
        for (let i = 0; i < value.length; i++) {
          temp += toHtmlList(value[i]);
        }
        temp += `${obj[key]}</li>`;
      } else {
        console.log("key", key, "value", value);
        temp += `<li>${key}: ${obj[key]}</li>`;
      }
    }
  }
  temp += "</ul>";
  return temp;
}

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
      // let htmlStr = toHtmlList(outliner);
      // document.body.innerHTML = htmlStr;
      ("use strict");

      const e = React.createElement;

      class LikeButton extends React.Component {
        constructor(props) {
          super(props);
          this.state = { liked: false };
        }

        render() {
          if (this.state.liked) {
            return "You liked this.";
          }

          return e(
            "button",
            { onClick: () => this.setState({ liked: true }) },
            "Like"
          );
        }
      }

      const domContainer = document.querySelector("#like_button_container");
      ReactDOM.render(e(LikeButton), domContainer);
    }
  });
});
