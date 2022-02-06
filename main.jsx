import { listenAndServe } from "./deps.ts";
import { React } from "./deps.ts";
import { ReactDOMServer } from "./deps.ts";

function App() {
    return <div>Hello SSR</div>;
}

listenAndServe({ port: 8080 }, (req) => {
    req.respond({
        status: 200,
        headers: new Headers({
            "Content-Type": "text/html",
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
});