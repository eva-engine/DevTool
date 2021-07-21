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
      let outlinerNode = {
        parent: 0,
        children: [],
        id: null,
      };
      let nodes = [root];
      let outliner = [outlinerNode];

      for (let i = 0; i < objs?.length; i++) {
        let obj = objs[i];
        let filteredComponents = buildWhiteList(obj?.components);
        let componentsInfo = {
          id: obj?.id,
          components: filteredComponents,
        };
        let newOutliner = {
          id: obj?.id,
          key: obj?.id,
          title: obj?.name,
          scene: obj?.scene?.id,
          parent: obj?.parent?.id ? obj.parent.id : 0,
          children: [],
        };
        nodes.push(componentsInfo);
        outliner.push(newOutliner);
      }
      if (outliner.length > 1) {
        for (let i = outliner.length - 1; i > 1; i--) {
          let parent = outliner[i].parent;
          let parentNode = outliner[parent];
          parentNode.children.splice(0, 0, outliner[i]);
        }
      }
      // console.log(nodes[1]);
      return {
        nodes: nodes,
        outliner: outliner[1],
      };
    }

    function buildWhiteList(components) {
      let res = [];
      for (let i = 0; i < components?.length; i++) {
        if (!components[i].constructor.IDEProps) continue;
        let whiteList = [...components[i].constructor.IDEProps, "name"];
        let component = components[i];
        let objForReact = copyObjForReact(component, whiteList);
        res.push(objForReact);
      }
      return res;
    }
    function copyObjForReact(originObj, whitelist) {
      let temp = {};
      for (let i = 0; i < whitelist.length; i++) {
        if (typeof originObj[whitelist[i]] === "object") {
          let obj = originObj[whitelist[i]];
          let secondKeys = Object.keys(obj);
          for (let j = 0; j < secondKeys.length; j++) {
            let newKey = whitelist[i] + "." + secondKeys[j];
            temp[newKey] = obj[secondKeys[j]];
          }
        } else {
          temp[whitelist[i]] = originObj[whitelist[i]];
        }
      }
      return temp;
    }
    let result = transformToNodes(objs);
    console.log("result", result);
    window.postMessage({ result: result }, "*");
    let setIntervalId;
    if (window.$eva) {
      setIntervalId =  setInterval(() => {
        let currentEva = window.$eva;
        let currentInfo = transformToNodes(currentEva);
        let nodes = currentInfo.nodes;
        window.postMessage(
          {
            nodes: nodes,
          },
          "*"
        );
      }, 1000);
    }else{
      clearInterval(setIntervalId);
    }
    window.addEventListener("message", function (event) {
      // 接受panel.js 借用content.js发送的编辑值，修改页面实例对象的值
      let eventKey = event.data.key;
      const eventValue = event.data.value;
      if (eventKey) {
        let keys = eventKey.split("-");
        const componentKey = keys[0];
        const objId = keys[1] - 1;
        console.log("objId", objId);
        const componentId = keys[2];
        if (componentKey.indexOf(".")) {
          let firstAndSecondKey = componentKey.split(".");
          const firstKey = firstAndSecondKey[0];
          const secondKey = firstAndSecondKey[1];
          window.$eva[objId].components[componentId][firstKey][secondKey] =
            eventValue;
        } else {
          window.$eva[objId].components[componentId][componentKey] = eventValue;
        }
      }
    });
  }
  const code = injectedScript.toString();
  globalHook.executeInContext(code);
});
window.addEventListener(
  "message",
  function (event) {
    if (event.data.result) {
      let result = event.data.result;
      chrome.runtime.sendMessage(
        { sign: "EvaDevtool", tree: result },
        function (response) {
          console.log(response.farewell);
        }
      );
    }
    if (event.data.nodes) {
      let nodes = event.data.nodes;
      chrome.runtime.sendMessage(
        { sign: "Nodes", nodes: nodes },
        function (response) {
          console.log(response.farewell);
        }
      );
    }
  },
  false
);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd == "test") {
    window.postMessage({ key: request.key, value: request.value });
    console.log("key", request.key);
  }
  sendResponse("hhh");
});
