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
      sendResponse({ farewell: "欢迎使用EvaDevtool" });
      console.log(request.tree);
      document.body.innerHTML = JSON.stringify(request.tree);
    }
  });
});
