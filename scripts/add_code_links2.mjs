// Add GitHub code links for 4 more publications.
import yaml from 'js-yaml';
import fs from 'node:fs';
const YAML_PATH = new URL('../src/data.yaml', import.meta.url);
const data = yaml.load(fs.readFileSync(YAML_PATH, 'utf8'));
const UPDATES = {
  11: 'https://github.com/m31-1612/HydroGrasp',           // HydroGrasp
  12: 'https://github.com/leemojiang/D-LUT',              // D-LUT
  24: 'https://github.com/MegaYEye/Nonmyopic-GKVM-planner', // Nonmyopic IPP
  28: 'https://github.com/MegaYEye/Triangle-Net',         // Triangle-Net
};
let n = 0;
for (const pub of data.publications) {
  if (UPDATES[pub.id]) { pub.links.code = UPDATES[pub.id]; n++; }
}
fs.writeFileSync(YAML_PATH, yaml.dump(data, { lineWidth: -1, noRefs: true, quotingType: '"' }));
console.log(`Updated ${n} code links:`);
for (const pub of data.publications) if (UPDATES[pub.id]) console.log(`  id ${pub.id}: ${pub.links.code}`);
