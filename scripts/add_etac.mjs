import yaml from 'js-yaml';
import fs from 'node:fs';
const YAML_PATH = new URL('../src/data.yaml', import.meta.url);
const data = yaml.load(fs.readFileSync(YAML_PATH, 'utf8'));
const etac = data.publications.find(p => p.id === 34);
etac.links.code = 'https://github.com/Crxus/ETac';
etac.links.video = 'https://lassford.github.io/ETac/';
fs.writeFileSync(YAML_PATH, yaml.dump(data, { lineWidth: -1, noRefs: true, quotingType: '"' }));
console.log('ETac updated: code=' + etac.links.code + ' video=' + etac.links.video);
