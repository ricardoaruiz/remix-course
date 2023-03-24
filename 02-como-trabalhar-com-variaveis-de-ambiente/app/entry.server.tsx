// This file was not automatically generated on project creation
// Here is the documentation => https://remix.run/docs/en/1.14.3/file-conventions/entry.server

import { renderToString } from "react-dom/server";
import type {
  EntryContext,
  HandleDataRequestFunction,
} from "@remix-run/node"; // or cloudflare/deno
import { RemixServer } from "@remix-run/react";
import { getEnv } from "./env.server";

// Here is populating the global ENV with environment variables values
global.ENV = getEnv()

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

// this is an optional export
export const handleDataRequest: HandleDataRequestFunction =
  (
    response: Response,
    // same args that get passed to the action or loader that was called
    { request, params, context }
  ) => {
    response.headers.set("x-custom", "yay!");
    return response;
  };
