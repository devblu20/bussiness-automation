import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';

// Render the single route at build time. Vercel serves complete HTML, then React hydrates it.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { App } = await server.ssrLoadModule('/src/App.tsx');
  const markup = renderToString(createElement(App));
  const template = await readFile('dist/index.html', 'utf8');
  const placeholder = '<div id="root"></div>';
  if (!template.includes(placeholder)) throw new Error('Missing HTML root for pre-rendering');
  await writeFile('dist/index.html', template.replace(placeholder, `<div id="root">${markup}</div>`));
  console.log('Pre-rendered Aaliden homepage: complete content and contact links in HTML.');
} finally {
  await server.close();
}
