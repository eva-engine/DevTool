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

    const util = {
      transformToNodes(objs) {
        let root = {};
        let outlinerNode = {
          parent: 0,
          children: [],
          id: null,
        };
        let nodes = [root];
        let outliner = [outlinerNode];

        for (let i = 0; i < objs?.length; i++) {
          const obj = objs[i];
          const componentsKeepType = util.handleComponentsInfo(obj?.components);

          const componentsInfo = {
            id: obj?.id,
            componetsKeepType: componentsKeepType,
          };
          const newOutliner = {
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
            const parent = outliner[i].parent;
            const parentNode = outliner[parent];
            parentNode.children.splice(0, 0, outliner[i]);
          }
        }
        return {
          nodes: nodes,
          outliner: outliner[1],
        };
      },
      handleComponentsInfo(components) {
        const componentsKeepType = [];
        for (let i = 0; i < components?.length; i++) {
          const types = components[i].constructor.IDEProps;
          if (!types) continue;
          const whiteList = ["name"];
          for (const item in types) {
            whiteList.push(types[item].key);
          }
          const component = components[i];
          componentsKeepType.push(
            util.getComponentInfo(component, whiteList, types)
          );
        }
        return componentsKeepType;
      },
      getComponentInfo(originObj, whitelist, componentIDEProp) {
        const temp = {};
        temp["name"] = originObj["name"];
        for (let i = 1; i < whitelist.length; i++) {
          const prop = whitelist[i];
          temp[prop] = originObj[prop]
            ? {
                value: originObj[prop],
                type: componentIDEProp[prop].type,
                step: componentIDEProp[prop].step,
              }
            : undefined;
        }
        return temp;
      },
      modifyEvaInstanceValue(eventKey, eventValue) {
        let keys = eventKey.split("-");
        const componentKey = keys[0];
        const objId = keys[1] - 1;
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
        }
      },
      refreshNodesInfo() {
        const setIntervalId = setInterval(() => {
            const currentEvaInstance = window.__EVA_GAME_INSTANCE__.gameObjects;
            const currentInstanceInfo =
              util.transformToNodes(currentEvaInstance);
            const currentNodesInfo = currentInstanceInfo.nodes;
            window.postMessage(
              {
                nodes: currentNodesInfo,
              },
              "*"
            );
          }, 1000);
        return setIntervalId;
      },
      initEvaInstanceInfo() {
        const evaGameObjects = window.__EVA_GAME_INSTANCE__.gameObjects;
        const result = util.transformToNodes(evaGameObjects);
        window.postMessage({ result: result }, "*");
      },
    };
    const evaInstanceExist = window.__EVA_GAME_INSTANCE__;
    let clearIntervalId;
    if (evaInstanceExist) {
      util.initEvaInstanceInfo();
      clearIntervalId = util.refreshNodesInfo();

      window.addEventListener("message", function (event) {
        let eventKey = event.data.key;
        const eventValue = event.data.value;
        if (eventKey) {
          util.modifyEvaInstanceValue(eventKey, eventValue);
        }
      });
    }else{
      clearInterval(clearIntervalId);
    }
  }
  const code = injectedScript.toString();
  globalHook.executeInContext(code);
});
window.addEventListener(
  "message",
  function (event) {
    const result = event.data.result;
    if (result) {
      chrome.runtime.sendMessage(
        { sign: "EvaDevtool", tree: result },
        function (response) {
          console.log(response.farewell);
        }
      );
    }
    const nodes = event.data.nodes;
    if (nodes) {
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
  }
  sendResponse("hhh");
});
