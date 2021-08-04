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
function setInspectorEev() {
  window.__EVA_INSPECTOR_ENV__ = true;
}
globalHook.executeInContext(setInspectorEev.toString());

document.addEventListener("DOMContentLoaded", function () {
  function injectedScript(window) {
    window.__EVA_INSPECTOR_ENV__ = true;

    let objs = window.__EVA_GAME_INSTANCE__.gameObjects;
    // let objs = window.game;
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
        let componentsInfoAfterHandle = handleComponentsInfo(obj?.components);

        let componentsInfo = {
          id: obj?.id,
          components: componentsInfoAfterHandle.componentsInfoAfterFilter,
          IDEProp: componentsInfoAfterHandle.componentsIDEProp,
          componetsKeepType: componentsInfoAfterHandle.componentsKeepType,
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
      return {
        nodes: nodes,
        outliner: outliner[1],
      };
    }

    function handleComponentsInfo(components) {
      let componentsInfoAfterFilter = [];
      let componentsKeepType = [];
      let componentsIDEProp = [];
      for (let i = 0; i < components?.length; i++) {
        let types = components[i].constructor.IDEProps;
        if (!types) continue;
        componentsIDEProp.push(types);
        let whiteList = ["name"];
        for (let item in types) {
          whiteList.push(types[item].key);
        }
        let component = components[i];
        let objForReact = copyObjForReact(component, whiteList);
        componentsInfoAfterFilter.push(objForReact);
        // console.log('IDEProp',componentsIDEProp[i]);
        componentsKeepType.push(
          IDEPropsWithType(component, whiteList, componentsIDEProp[i])
        );
      }
      // console.log('IDEPropsType', componentsKeepType);
      return {
        componentsInfoAfterFilter,
        componentsIDEProp,
        componentsKeepType,
      };
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
    function IDEPropsWithType(originObj, whitelist, componentIDEProp) {
      let temp = {};
      temp["name"] = originObj["name"];
      for (let i = 1; i < whitelist.length; i++) {
        let prop = whitelist[i];
        temp[prop] = originObj[prop]
          ? {
              value: originObj[prop],
              type: componentIDEProp[prop].type,
            }
          : undefined;
      }
      return temp;
    }
    let result = transformToNodes(objs);
    console.log("result", result);
    // console.log(result.nodes[1].IDEProp[0]);
    // let keys = Object.keys(result.nodes[1].components[0]);
    // for(let i = 0;i<keys.length;i++){
    //   let key = keys[i];
    //   console.log(key)
    //   console.log(result.nodes[1].IDEProp[0][key]);
    // }
    window.postMessage({ result: result }, "*");
    let setIntervalId;
    let isDevtool = window.__EVA_GAME_INSTANCE__;
    if (isDevtool) {
      setIntervalId = setInterval(() => {
        let currentEva = window.__EVA_GAME_INSTANCE__.gameObjects;
        let currentInfo = transformToNodes(currentEva);
        let nodes = currentInfo.nodes;
        window.postMessage(
          {
            nodes: nodes,
          },
          "*"
        );
      }, 1000);
    } else {
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
        if (componentKey.indexOf(".") > 0) {
          let firstAndSecondKey = componentKey.split(".");
          const firstKey = firstAndSecondKey[0];
          const secondKey = firstAndSecondKey[1];
          window.__EVA_GAME_INSTANCE__.gameObjects[objId].components[
            componentId
          ][firstKey][secondKey] = eventValue;
        } else {
          window.__EVA_GAME_INSTANCE__.gameObjects[objId].components[
            componentId
          ][componentKey] = eventValue;
          // window.game[objId].components[componentId][componentKey] = eventValue;
        }
      }
    });
  }
  const code = injectedScript.toString();
  globalHook.executeInContext(code);
  // globalHook.executeInContext(code);
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
