const securityHeaders = {
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-content-type-options": "nosniff",
  "x-frame-options": "SAMEORIGIN"
};

export default {
  async fetch(request, env) {
    if (!env?.ASSETS) {
      return new Response("El servicio de recursos estáticos no está disponible.", { status: 503 });
    }

    const url = new URL(request.url);
    if (url.pathname === "/") url.pathname = "/index.html";

    let response = await env.ASSETS.fetch(new Request(url, request));
    if (response.status === 404 && !url.pathname.split("/").pop().includes(".")) {
      url.pathname = `${url.pathname.replace(/\/$/, "")}.html`;
      response = await env.ASSETS.fetch(new Request(url, request));
    }

    const headers = new Headers(response.headers);
    for (const [name, value] of Object.entries(securityHeaders)) headers.set(name, value);
    if (url.pathname.endsWith(".html")) headers.set("cache-control", "public, max-age=0, must-revalidate");
    else if (response.ok) headers.set("cache-control", "public, max-age=31536000, immutable");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
