// Add confirmed GitHub code links (+ PP-Tac video) to publications in data.yaml.
import yaml from 'js-yaml';
import fs from 'node:fs';

const YAML_PATH = new URL('../src/data.yaml', import.meta.url);
const data = yaml.load(fs.readFileSync(YAML_PATH, 'utf8'));

// id -> { code, video } (only fields we are setting)
const UPDATES = {
  1:  { code: 'https://github.com/TangRobot/MFE' },                                  // MFE
  3:  { code: 'https://github.com/mrHuangyz/TaF-VLA' },                              // TaF-VLA
  13: { code: 'https://github.com/bigai-ai/PP-Tac', video: 'https://youtu.be/-npk0cRKWGI' }, // PP-Tac
  15: { code: 'https://github.com/Tsunami-kun/BimanGrasp-Generation' },              // Bimanual Grasp Synthesis
  35: { code: 'https://github.com/TangRobot/CoLI' },                                 // CoLI
};

let updated = 0;
for (const pub of data.publications) {
  const u = UPDATES[pub.id];
  if (!u) continue;
  if (u.code) pub.links.code = u.code;
  if (u.video) pub.links.video = u.video;
  updated++;
}
fs.writeFileSync(YAML_PATH, yaml.dump(data, { lineWidth: -1, noRefs: true, quotingType: '"' }));
console.log(`Updated code links for ${updated} publications.`);
for (const pub of data.publications) {
  if (pub.links?.code) console.log(`  id ${pub.id}: code=${pub.links.code} video=${pub.links.video||''}`);
}
