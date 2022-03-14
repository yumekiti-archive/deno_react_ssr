import { React } from "../deno/deps.ts";

export default ({src, style, meta}) => {
    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <title>{meta.title}</title>
                <meta name="description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                {/* TOPページの場合は「website」、WEBサイト上の記事ページなど、TOPページ以外には「article」を指定します。 */}
                <meta property="og:type" content={meta.type} />
                <meta property="og:url" content={meta.url} />
                <meta property="og:image" content={ meta.image || "https://pbs.twimg.com/profile_images/1492151996857860097/MRnAqw5h_400x400.png" } />
                <meta property="og:image:width" content={meta.width || "400"} />
                <meta property="og:image:height" content={meta.height || "400"} />
                <meta property="og:locale" content="ja_JP"  />
                <meta property="og:site_name" content="denoなサイト" />
                
                {/* ビューポートタグ */}
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <style>{style}</style>
            </head>
            <body>
                <div id="app"></div>
                <script type="module" src={src}></script>
            </body>
        </html>
    )
}