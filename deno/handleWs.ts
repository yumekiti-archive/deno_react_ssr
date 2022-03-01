import { isWebSocketCloseEvent, isWebSocketPingEvent, WebSocket } from "./deps.ts";

const clients = new Map<number, WebSocket>();

const dispatch = (msg: string): void => {
    for (const client of clients.values()) {
        client.send(msg);
    }
}

export default async function (sock: WebSocket) {
    try {
        for await (const ev of sock) {
            if (typeof ev === "string") {
                let id = JSON.parse(ev).id;
                if(!clients.has(id)){
                    clients.set(id, sock);
                }

                // text message.
                console.log("ws:Text", ev);
                dispatch(ev)
            } else if (ev instanceof Uint8Array) {
                // binary message.
                console.log("ws:Binary", ev);
            } else if (isWebSocketPingEvent(ev)) {
                const [, body] = ev;
                // ping.
                console.log("ws:Ping", body);
            } else if (isWebSocketCloseEvent(ev)) {
                // close.
                clients.forEach((value, key, map) => {
                    if(value.isClosed) clients.delete(key)
                });
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