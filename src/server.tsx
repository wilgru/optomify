import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import {
  createStartHandler,
  defineHandlerCallback,
  type RequestHandler,
} from "@tanstack/react-start/server";
import type { Register } from "@tanstack/react-router";
import {
  RouterServer,
  renderRouterToString,
} from "@tanstack/react-router/ssr/server";

const renderHandler = defineHandlerCallback(({ router, responseHeaders }) => {
  const styleCache = createCache();

  return renderRouterToString({
    router,
    responseHeaders,
    children: (
      <StyleProvider cache={styleCache} hashPriority="high">
        <RouterServer router={router} />
      </StyleProvider>
    ),
  }).then(async (response) => {
    const html = await response.text();
    const extractedStyles = extractStyle(styleCache);

    if (!extractedStyles || !html.includes("</head>")) {
      return new Response(html, {
        status: response.status,
        headers: response.headers,
      });
    }

    const headers = new Headers(response.headers);
    headers.delete("content-length");

    return new Response(html.replace("</head>", `${extractedStyles}</head>`), {
      status: response.status,
      headers,
    });
  });
});

const fetch: RequestHandler<Register> = createStartHandler(renderHandler);

export default {
  fetch,
};
