// 创建自定义面板，同一个插件可以创建多个自定义面板
// 几个参数依次为：panel标题、图标（其实设置了也没地方显示）、要加载的页面、加载成功后的回调
chrome.devtools.panels.create(
  "Eva Panel",
  "img/icon.png",
  "chrome-extension/eva.pannel.html",
  function (panel) {
    console.log("自定义面板创建成功！"); // 注意这个log一般看不到
  }
);
// document.addEventListener("DOMContentLoaded", function () {
//   console.log("tabId", chrome.devtools.inspectedWindow.tabId);
// });


// function receiveMessage(event) {
//   console.log("devtools msg: ", event);
// }

// window.addEventListener("message", receiveMessage, false);
