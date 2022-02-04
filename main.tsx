import { createRouter } from 'https://denopkg.com/keroxp/servest/router.ts';
import React from 'https://dev.jspm.io/react';
import ReactDOMServer from 'https://dev.jspm.io/react-dom/server';

import App from './app.tsx';

const router = createRouter();
router.handle('/', async req => {
    await req.respond({
        headers: new Headers({
            'content-type': 'text/html; charset=UTF-8',
            status: 200,
        }),
        body: ReactDOMServer.renderToString(
            <html>
                <head>
                    <title>deno react ssr</title>
                </head>
                <body>
                    <App />
                </body>
            </html>
        )
    })
});

router.listen(':8000');