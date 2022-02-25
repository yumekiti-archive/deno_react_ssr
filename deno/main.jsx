// Deno
import { listenAndServe } from "./deps.ts";
import { acceptWebSocket, isWebSocketCloseEvent, isWebSocketPingEvent, WebSocket } from "./deps.ts";

// React
import { React, ReactDOMServer } from "./deps.ts";
import App from "../react/app.jsx";

// Twind
import { twind, sheets } from "./deps.ts";

// bundle.jsの有無
const BUNDLE_JS_FILE_URL = "bundle.js";
let js = "not Found";
try{
    js = await Deno.readFile(`./react/${BUNDLE_JS_FILE_URL}`);
}catch(e){
    console.log(e);
}

// Twind
const sheet = sheets.virtualSheet()
twind.setup({ sheet })
sheet.reset()
const styleTag = sheets.getStyleTag(sheet)

// ws
async function handleWs(sock) {
    console.log("socket connected!");
    try {
        for await (const ev of sock) {
            if (typeof ev === "string") {
                // text message.
                console.log("ws:Text", ev);
                await sock.send(ev);
            } else if (ev instanceof Uint8Array) {
                // binary message.
                console.log("ws:Binary", ev);
            } else if (isWebSocketPingEvent(ev)) {
                const [, body] = ev;
                // ping.
                console.log("ws:Ping", body);
            } else if (isWebSocketCloseEvent(ev)) {
                // close.
                const { code, reason } = ev;
                console.log("ws:Close", code, reason);
            }
        }
    } catch (err) {
        console.error(`failed to receive frame: ${err}`);

        if (!sock.isClosed) {
            await sock.close(1000).catch(console.error);
        }
    }
}

listenAndServe({ port: 8080 }, (request) => {
    // web
    if(request.method === "GET" && request.url === "/"){
        request.respond({
            status: 200,
            headers: new Headers({
                "Content-Type": "text/html; charset=UTF-8",
            }),
            body: ReactDOMServer.renderToString(
                <html>
                    <head>
                        <style>{styleTag}</style>
                    </head>
                    <body>
                        <div id="app"></div>
                        <script type="module" src={BUNDLE_JS_FILE_URL}></script>
                    </body>
                </html>
            ),
        });
    }

    else if(request.method === "GET" && request.url === "/favicon.ico"){
        request.respond({
            status: 302,
            headers: new Headers({
                location: "https://deno.land/favicon.ico",
            }),
        });
    }

    else if(request.method === "GET" && request.url === "/bundle.js"){
        request.respond({
            status: 200,
            headers: new Headers({
                "Content-Type": "text/javascript",
            }),
            body: js,
        });
    }

    // api
    else if(request.method === "GET" && request.url === "/api"){
        request.respond({
            status: 200,
            headers: new Headers({
                "content-type": "application/json",
            }),
            body: JSON.stringify({
                test: "hoge",
            }),
        })
    }

    // ws
    else if(request.method === "GET" && request.url === "/ws"){
        const { conn, r: bufReader, w: bufWriter, headers } = request;
        acceptWebSocket({
            conn,
            bufReader,
            bufWriter,
            headers,
        }).then(handleWs)
    }

    // 404
    else{
        request.respond({
            status: 404,
            body: "404 | Page not Found"
        })
    }
});