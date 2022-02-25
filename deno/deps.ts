/**
 * deps.ts
 *
 * This module re-exports the required methods from the dependant remote Ramda module.
**/

// Deno
export { listenAndServe } from "https://deno.land/std@0.99.0/http/mod.ts";
export { v4 } from "https://deno.land/std@0.99.0/uuid/mod.ts";
import { acceptWebSocket, isWebSocketCloseEvent, isWebSocketPingEvent, WebSocket } from "https://deno.land/std@0.99.0/ws/mod.ts";
export type { WebSocket };
export { acceptWebSocket, isWebSocketCloseEvent, isWebSocketPingEvent };

// React
export { default as React } from "https://esm.sh/react@17.0.2";
export { default as ReactDOMServer } from "https://esm.sh/react-dom@17.0.2/server";
export { default as ReactDOM } from "https://esm.sh/react-dom@17.0.2";

// Twind
export * as twind from "https://cdn.skypack.dev/twind@0.16.16";
export * as sheets from "https://cdn.skypack.dev/twind@0.16.16/sheets";