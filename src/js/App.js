import React from "react";

const App = () => {
  const sendNotification = () => {
    //Loaded from preload.js
    electron.notificationApi.sendNotification({title: 'New message from vani', body: 'My custom message!'})
  };
  return (
    <>
      <h1>Hello World - React App! </h1>
      <button onClick={sendNotification}>Send Notification</button>
    </>
  );
};

export default App;
