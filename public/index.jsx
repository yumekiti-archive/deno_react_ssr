import { React } from "../deno/deps.ts";

export default ({src, style}) => {
    return (
        <html>
            <head>
                <style>{style}</style>
            </head>
            <body>
                <div id="app"></div>
                <script type="module" src={src}></script>
            </body>
        </html>
    )
}