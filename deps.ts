/**
 * deps.ts
 *
 * This module re-exports the required methods from the dependant remote Ramda module.
**/
export { listenAndServe } from "https://deno.land/std@0.99.0/http/mod.ts";
export { default as React } from "https://jspm.dev/react@17.0.2";
export { default as ReactDOMServer } from "https://jspm.dev/react-dom@17.0.2/server";