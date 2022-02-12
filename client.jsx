import { React, ReactDOM } from "./deps.ts";
import App from "./App.jsx";

ReactDOM.hydrate(
    <App />,
    //@ts-ignore
    document.getElementById("app"),
);