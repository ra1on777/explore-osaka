// Build ohne Vite: esbuild bündelt src/main.ts, kopiert public/ und index.html nach dist/.
// node tools/build.mjs            -> Produktions-Build nach dist/
// node tools/build.mjs --serve    -> Entwicklungsserver auf http://localhost:5173
import * as esbuild from 'esbuild';
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';

const serve = process.argv.includes('--serve');
const out = 'dist';
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync('public', out, { recursive: true });
const version = Date.now().toString(36);
writeFileSync(`${out}/index.html`, readFileSync('index.html', 'utf8').replaceAll('__V__', version));
writeFileSync(`${out}/sw.js`, readFileSync('public/sw.js', 'utf8').replaceAll('__V__', version));

const opts = {
  entryPoints: { app: 'src/main.ts' },
  bundle: true,
  outdir: out,
  format: 'esm',
  target: 'es2020',
  minify: !serve,
  sourcemap: serve,
  loader: { '.json': 'json' },
  logLevel: 'info',
};
if (serve) {
  const ctx = await esbuild.context(opts);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: out, port: 5173 });
  console.log(`Dev-Server: http://localhost:${port}`);
} else {
  await esbuild.build(opts);
}
