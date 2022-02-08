import { listenAndServe } from "./deps.ts";
import { React } from "./deps.ts";
import { ReactDOMServer } from "./deps.ts";

import Index from "./pages/index.jsx";

listenAndServe({ port: 8080 }, (req) => {
    req.respond({
        status: 200,
        headers: new Headers({
            "Content-Type": "text/html",
        }),
        body: ReactDOMServer.renderToString(
            <Index />
        ),
    });
});