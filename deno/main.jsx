// Deno
import { listenAndServe } from "./deps.ts";
import { acceptWebSocket } from "./deps.ts";
import handleWs from "./handleWs.ts";
import Router from "./route.ts";

// React
import { React, ReactDOMServer } from "./deps.ts";
import Index from "../public/index.jsx";
import App from "../react/app.jsx";
import Bundle from "./bundle.ts";

// Twind
import Twind from "./twind.ts";

// bundle.jsの有無
const BUNDLE_JS_FILE_URL = "bundle.js";
const bundle = await Bundle(BUNDLE_JS_FILE_URL);

listenAndServe({ port: 8080 }, async (request) => {
    // web
    await Router(request, "GET", "/", 200,
        {"Content-Type": "text/html; charset=UTF-8"},
        ReactDOMServer.renderToString(
            <Index style={Twind} src={BUNDLE_JS_FILE_URL}/>
        )
    );

    await Router(request, "GET", "/favicon.ico", 302,
        {location: "https://deno.land/favicon.ico"},
    );

    await Router(request, "GET", "/bundle.js", 200,
        {"Content-Type": "text/javascript"},
        bundle
    );

    // api
    await Router(request, "GET", "/api", 200,
        {"content-type": "application/json"},
        JSON.stringify({
            test: "hoge",
        }),
    );

    // ws
    if(request.method === "GET" && request.url === "/ws"){
        const { conn, r: bufReader, w: bufWriter, headers } = request;
        acceptWebSocket({
            conn,
            bufReader,
            bufWriter,
            headers,
        }).then(handleWs)
    }
});