const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
});

//// Below code works when contextIsolation: false in main.js
// window.sendNotification = (message) => {
//     ipcRenderer.send('notify', message)
// }
