import { listenAndServe } from "./deps.ts";
import { React } from "./deps.ts";
import { ReactDOMServer } from "./deps.ts";

import App from "./App.jsx";

const BUNDLE_JS_FILE_URL = "./bundle.js";

// bundle.jsが無いとエラーになる
const js = await Deno.readFile(`./${BUNDLE_JS_FILE_URL}`);

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
                    <head></head>
                    <body>
                        <div id="app">
                            <App />
                        </div>
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

    // 404
    else{
        request.respond({
            status: 404,
            body: "404 | Page not Found"
        })
    }
});