// Add project-page (webpage) links to publications, and fix the DexMove/ETac
// cases where a project page was previously stored in the `video` field.
import yaml from 'js-yaml';
import fs from 'node:fs';

const YAML_PATH = new URL('../src/data.yaml', import.meta.url);
const data = yaml.load(fs.readFileSync(YAML_PATH, 'utf8'));

// id -> project page URL
const WEBPAGES = {
  35: 'https://tangrobot.github.io/CoLI-website/',       // CoLI
  34: 'https://lassford.github.io/ETac/',                 // ETac
  31: 'https://peilin-666.github.io/projects/DexMove/',   // DexMove
  13: 'https://peilin-666.github.io/projects/PP-Tac/',    // PP-Tac
  3:  'https://peilin-666.github.io/projects/TaF_VLA/',   // TaF-VLA
};

// Project pages that were wrongly stored as `video` -> clear them so video
// is reserved for actual video links (PP-Tac keeps its YouTube link).
const CLEAR_VIDEO = new Set([34, 31]); // ETac, DexMove

for (const pub of data.publications) {
  if (!pub.links) pub.links = {};
  if (WEBPAGES[pub.id]) {
    pub.links.webpage = WEBPAGES[pub.id];
    if (CLEAR_VIDEO.has(pub.id)) {
      // move misplaced project-page URL out of video
      if (pub.links.video === WEBPAGES[pub.id]) pub.links.video = '';
    }
  }
  // Normalise empty strings to '' (keep field present for consistent ordering)
}

fs.writeFileSync(YAML_PATH, yaml.dump(data, { lineWidth: -1, noRefs: true, quotingType: '"' }));
console.log('Updated webpage links:');
for (const pub of data.publications) {
  if (pub.links?.webpage) {
    console.log(`  id ${pub.id}: webpage=${pub.links.webpage} | video=${pub.links.video || '(none)'}`);
  }
}
