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
    let gameInstance = window.__EVA_GAME_INSTANCE__;
    console.log("game", gameInstance);
    const target = {
      field1: 1,
      field2: undefined,
      field3: {
          child: 'child'
      },
      field4: [2, 4, 8]
  };
  target.target = target;
  
    window.postMessage({ game: target}, "*");
    // let postBridge = window;
    // postBridge.postMessage({"game":game}, "*");
  }
  const code = injectedScript.toString();
  globalHook.executeInContext(code);
});

// window.addEventListener("message",function(event){
//   console.log(event)
//   if(event.data.game){
//     console.log('gameByMessage', game)
//   }
// })
window.addEventListener(
  "message",
  function (event) {
    if (event.data.game) {
      game = event.data.game;
      console.log("game", game);
    }
  },
  false
);
// console.log("game", game);
