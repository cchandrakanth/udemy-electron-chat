import React from "react";
// import {render} from "react-dom";

//// React 17 code
// ReactDOM.render( <h1>I am a React App! </h1>, document.getElementById("root"));

import {createRoot} from "react-dom/client";
import App from "./App";

// React 18 code.
createRoot(document.getElementById("root")).render(<App />)
