// let color = "#3aa757";

// chrome.runtime.onInstalled.addListener(() => {
// //   chrome.storage.sync.set({ color });
// //   console.log("Default background color set to %cgreen", `color : ${color}`);
//   console.log('hello world');
//   console.log(EVA)
// });

// chrome.runtime.onInstalled.addListener(function(){
// 	chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
// 		chrome.declarativeContent.onPageChanged.addRules([
// 			{
// 				conditions: [
// 					// 只有打开百度才显示pageAction
// 					new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'ninePatch'}})
// 				],
// 				actions: [new chrome.declarativeContent.ShowPageAction()]
// 			}
// 		]);
// 	});
// });