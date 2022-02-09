import { listenAndServe } from "./deps.ts";
import { React } from "./deps.ts";
import { ReactDOMServer } from "./deps.ts";

import Index from "./pages/index.jsx";

listenAndServe({ port: 8080 }, (request) => {
    if(request.method === "GET" && request.url === "/"){
        request.respond({
            status: 200,
            headers: new Headers({
                "Content-Type": "text/html",
            }),
            body: ReactDOMServer.renderToString(
                <Index />
            ),
        });
    }

    if(request.method === "GET" && request.url === "/favicon.ico"){
        request.respond({
            status: 302,
            headers: new Headers({
                location: "https://deno.land/favicon.ico",
            }),
        });
    }
});