// Cloudflare Worker for mk.advancio.io: routes each marketing app by first path segment
// to its own Azure Web App. To add an app, add one line to ROUTES.
const ROUTES = {
  booth: "advancio-booth.azurewebsites.net",
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const app = url.pathname.split("/")[1];
    const origin = ROUTES[app];
    if (!origin) return new Response("Not found", { status: 404 });

    // The app is built with basePath "/<app>", so the path is forwarded unchanged.
    url.hostname = origin;
    url.protocol = "https:";
    url.port = "";
    const upstream = new Request(url, request);
    upstream.headers.set("x-forwarded-host", "mk.advancio.io");
    return fetch(upstream);
  },
};
