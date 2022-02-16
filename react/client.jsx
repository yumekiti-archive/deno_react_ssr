import { React, ReactDOM } from "../deno/deps.ts";
import App from "./components/app.jsx";

ReactDOM.hydrate(
    <App />,
    //@ts-ignore
    document.getElementById("app"),
);