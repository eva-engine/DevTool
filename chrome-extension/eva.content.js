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
    let gameInstance = window.$eva;
    let gameObjects = gameInstance.gameObjects;
    let res = [];
    for(let i = 0;i<gameObjects.length;i++){
      let temp = {};
      for(const key in gameObjects[i]){
        if(typeof gameObjects[i][key] !=='object' && typeof gameObjects[i][key] !== 'function'){
          temp[key] = gameObjects[i][key]
        }
      }
      res.push(temp);
    }

    console.log("game injected-script", res);
  
    window.postMessage({ game: res}, "*");
    // let postBridge = window;
    // postBridge.postMessage({"game":game}, "*");
  }
  const code = injectedScript.toString();
  globalHook.executeInContext(code);
});


window.addEventListener(
  "message",
  function (event) {
    if (event.data.game) {
      game = event.data.game;
      console.log("game content-script", game);
    }
  },
  false
);
