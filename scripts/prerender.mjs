import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { readFile, writeFile, mkdir } from "node:fs/promises";

// Each route gets complete HTML and its own search metadata.
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { App } = await server.ssrLoadModule("/src/App.tsx");
  const { servicePages } = await server.ssrLoadModule("/src/ServicePage.tsx");
  const template = await readFile("dist/index.html", "utf8");
  const placeholder = '<div id="root"></div>';
  if (!template.includes(placeholder))
    throw new Error("Missing HTML root for pre-rendering");
  const escape = (value) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  const routes = [
    { path: "/" },
    ...servicePages.map((page) => ({ path: `/services/${page.id}/`, page })),
  ];
  for (const { path, page } of routes) {
    const markup = renderToString(createElement(App, { pathname: path }));
    let html = template.replace(placeholder, `<div id="root">${markup}</div>`);
    if (page) {
      const title = escape(`${page.name} AI & Automation Services | Aaliden`);
      const description = escape(page.description);
      const url = `https://www.aaliden.com${path}`;
      html = html
        .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
        .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
        .replace(
          /(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*(")/g,
          `$1${description}$2`,
        )
        .replace(
          /(<meta\s+(?:name|property)="(?:og:title|twitter:title)"\s+content=")[^"]*(")/g,
          `$1${title}$2`,
        )
        .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
    }
    const directory = path === "/" ? "dist" : `dist${path}`;
    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/index.html`, html);
  }
  console.log(
    `Pre-rendered ${routes.length} pages with route-specific content and metadata.`,
  );
} finally {
  await server.close();
}
