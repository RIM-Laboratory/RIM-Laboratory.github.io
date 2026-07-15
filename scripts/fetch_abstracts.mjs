// Fetch abstracts for every publication in src/data.yaml — robust version.
// Each paper is fetched independently; a failure on one never aborts the rest.
// Results are written to /tmp/abstracts.json incrementally and at the end.
// Sources, in order: arXiv Atom API (if pdf is an arxiv url) -> Semantic Scholar (by title).
import yaml from 'js-yaml';
import fs from 'node:fs';

const raw = fs.readFileSync(new URL('../src/data.yaml', import.meta.url), 'utf8');
const data = yaml.load(raw);

const UA = 'RIM-Lab-Web/1.0 (mailto:xiaochx@shanghaitech.edu.cn)';
const OUT = '/tmp/abstracts.json';

// resume from any partial results
const out = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};

function arxivId(url) {
  const m = String(url).match(/(\d{4}\.\d{4,5}(v\d+)?)/);
  return m ? m[1] : null;
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function get(url, { json = true } = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: controller.signal });
    if (!res.ok) return null;
    return json ? await res.json() : await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

async function fetchArxiv(id) {
  const xml = await get(`https://export.arxiv.org/api/query?id_list=${id}`, { json: false });
  if (!xml) return null;
  const m = xml.match(/<summary>([\s\S]*?)<\/summary>/);
  if (!m) return null;
  return m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() || null;
}

async function fetchS2(title) {
  const q = encodeURIComponent(title);
  const j = await get(`https://api.semanticscholar.org/graph/v1/paper/search?query=${q}&limit=3&fields=title,abstract`);
  if (!j || !j.data) return null;
  const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const want = norm(title);
  const best = j.data.find(p => norm(p.title) === want)
    || j.data.find(p => norm(p.title).slice(0, 60) === want.slice(0, 60))
    || j.data.find(p => p.abstract)
    || j.data[0];
  return best && best.abstract ? best.abstract.replace(/\s+/g, ' ').trim() : null;
}

for (const pub of data.publications) {
  if (out[pub.id] && out[pub.id].abstract) {
    console.error(`[${pub.id}] cached`);
    continue;
  }
  const pdf = pub.links?.pdf || '';
  const axid = arxivId(pdf);
  let abs = null, source = 'none';

  if (axid) {
    for (let i = 0; i < 3 && !abs; i++) {
      abs = await fetchArxiv(axid);
      if (!abs) await sleep(1500 * (i + 1));
    }
    source = abs ? `arxiv:${axid}` : 'arxiv:miss';
  }
  if (!abs) {
    for (let i = 0; i < 4 && !abs; i++) {
      abs = await fetchS2(pub.title);
      if (!abs) await sleep(2500 * (i + 1));
    }
    source = abs ? 'semantic-scholar' : 'none';
  }

  out[pub.id] = { title: pub.title, year: pub.year, source, abstract: abs };
  console.error(`[${pub.id}] ${source.padEnd(20)} ${abs ? 'OK' : 'MISS'}  ${pub.title.slice(0, 50)}`);
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
  await sleep(1000);
}

const got = Object.values(out).filter(v => v.abstract).length;
console.error(`\nDone. ${got}/${data.publications.length} abstracts. Wrote ${OUT}`);
