import { listenAndServe } from "./deps.ts";
import { React } from "./deps.ts";
import { ReactDOMServer } from "./deps.ts";

import App from "./App.jsx";

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