import { isWebSocketCloseEvent, isWebSocketPingEvent, WebSocket } from "./deps.ts";

export default async function (sock: WebSocket) {
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