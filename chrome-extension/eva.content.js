// document.addEventListener("DOMContentLoaded", function () {
//     let game = window.__EVA_GAME_INSTANCE__;

//     console.log("game", game);
//     console.log("window", window);
// });
const globalHook = {
  executeInContext(code) {
    const script = document.createElement("script");
    script.textContent = ";(" + code + ")(window)";
    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);
  },
};

document.addEventListener("DOMContentLoaded", function () {
  function injectedScript(window) {
    let objs = window.$eva;
    function transformToNodes(objs) {
      let root = {};
      let nodes = [root];

      for (let i = 0; i < objs?.length; i++) {
        let obj = objs[i];
        let filteredComponents = buildWhiteList(obj?.components);
        let node = {
          id: obj?.id,
          name: obj?.name,
          scene: obj?.scene?.id,
          parent: obj?.parent?.id,
          components: filteredComponents,
          children: [],
        };
        nodes.push(node);
      }
      if (nodes.length > 1) {
        for (let i = nodes.length - 1; i > 1; i--) {
          let parent = nodes[i].parent;
          let parentNode = nodes[parent];
          parentNode.children.splice(0, 0, nodes[i]);
        }
      }
      // console.log(nodes[1]);
      return nodes[1];
    }

    function buildWhiteList(components) {
      let res = [];
      for (let i = 0; i < components?.length; i++) {
        if (!components[i].constructor.IDEProps) continue;
        let temp = {};
        let whiteList = [...components[i].constructor.IDEProps, "name"];
        let component = components[i];
        for (let j = 0; j < whiteList?.length; j++) {
          temp[whiteList[j]] = component[whiteList[j]];
        }
        res.push(temp);
      }
      return res;
    }
    let tree = transformToNodes(objs);
    window.postMessage({ tree: tree }, "*");
  }
  const code = injectedScript.toString();
  globalHook.executeInContext(code);
});
window.addEventListener(
  "message",
  function (event) {
    if (event.data.tree) {
      let tree = event.data.tree;
      // console.log("content-script", tree);
      chrome.runtime.sendMessage(
        { sign: "EvaDevtool", tree: tree },
        function (response) {
          console.log(response.farewell);
        }
      );
    }
  },
  false
);

// chrome.runtime.onConnect.addListener(function(port) {
// 	console.log(port);
// 	if(port.name == 'test-connect') {
// 		port.onMessage.addListener(function(msg) {
// 			console.log('收到长连接消息：', msg);
// 			if(msg.question == '你是谁啊？') port.postMessage({answer: '我是你爸！'});
// 		});
// 	}
// });

// 报错 接收端不存在
