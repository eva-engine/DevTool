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

      for (let i = 0; i < objs.length; i++) {
        let obj = objs[i];
        let components = obj.components;
        let fileredComponents = buildWhiteList(obj?.components);
        let node = {
          id: obj?.id,
          name: obj?.name,
          scene: obj?.scene?.id,
          parent: obj?.parent?.id,
          components: fileredComponents,
        };
        nodes.push(node);
      }
      return nodes;
    }

    function buildWhiteList(components) {
      let res = [];
      for (let i = 0; i < components.length; i++) {
        if (!components[i].constructor.IDEProps) continue;
        let temp = {};
        let whiteList = [...components[i].constructor.IDEProps, "name"];
        let component = components[i];
        for (let j = 0; j < whiteList.length; j++) {
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
      tree = event.data.tree;
      console.log("tree content-script", tree);
    }
  },
  false
);
