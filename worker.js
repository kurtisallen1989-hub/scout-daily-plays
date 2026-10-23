export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/update") {
      if (request.headers.get("x-publish-key") !== env.PUBLISH_KEY) {
        return new Response("forbidden", { status: 403 });
      }
      await env.PAGE_KV.put("page", await request.text());
      return new Response("updated");
    }
    const html = await env.PAGE_KV.get("page");
    return new Response(html || "The Daily Scout - first edition publishing soon.", {
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }
};
