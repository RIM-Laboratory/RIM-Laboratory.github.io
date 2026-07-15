// Merge origin/main's new content into our branch's data.yaml without conflict markers.
// Adds: news id 20 (IROS 2026), recruitment news dates -> 2026.07,
//       3 new publications (TriCoSphere 33, ETac 34, CoLI 35) with tags + short abstracts.
// Preserves all our existing edits (bilingual \n, tags, abstracts, DexMove, gallery).
import yaml from 'js-yaml';
import fs from 'node:fs';

const YAML_PATH = new URL('../src/data.yaml', import.meta.url);
const data = yaml.load(fs.readFileSync(YAML_PATH, 'utf8'));

// --- 1) Recruitment news dates 2026.06 -> 2026.07 (main updated these) ---
for (const n of data.news) {
  if (n.id === 1 || n.id === 2) n.date = '2026.07';
}

// --- 2) Add news id 20 (IROS 2026 acceptance), placed right after id 2 / before id 3 ---
if (!data.news.some(n => n.id === 20)) {
  const i2026 = data.news.findIndex(n => n.id === 3);
  data.news.splice(i2026 >= 0 ? i2026 : 0, 0, { id: 20, date: '2026.06', content: 'One paper accepted to IROS 2026.' });
}

// --- 3) Three new publications (main added these at the top, before id 32) ---
const NEW_PUBS = [
  {
    id: 33,
    title: 'TriCoSphere: A High-Dexterity, Large-Volume, 3-Finger Coaxial Spherical Manipulator',
    authors: 'Runze Hu, Zhengying Zhu, Jinyu Li, Yatao Leng, Jingshuai Liu, Chenxi Xiao',
    venue: 'ICRA', year: 2026, image: '/images/pub_33.jpg',
    tags: ['Continuum Robot', 'Gripper Design', 'Dexterous Manipulation'],
    abstract: 'A high-dexterity, large-volume three-finger coaxial spherical manipulator. Its coaxial spherical mechanism gives the fingers a large workspace and high dexterity while keeping a compact form, enabling versatile grasping and manipulation of diverse objects.',
    links: { pdf: '', code: '', video: '' },
  },
  {
    id: 34,
    title: 'ETac: A Lightweight and Efficient Tactile Simulation Framework for Learning Dexterous Manipulation',
    authors: 'Zhe Xu, Feiyu Zhao, Xiyan Huang, Chenxi Xiao',
    venue: 'ICRA', year: 2026, image: '/images/pub_34.jpg',
    tags: ['Tactile Sensor', 'Sim2Real', 'Dexterous Manipulation'],
    abstract: 'A lightweight and efficient tactile simulation framework for learning dexterous manipulation. It models vision-based tactile sensor response at low computational cost, making it practical to train tactile-driven manipulation policies in simulation and transfer them to the real hand.',
    links: { pdf: 'https://arxiv.org/abs/2604.20295', code: '', video: '' },
  },
  {
    id: 35,
    title: 'CoLI: A Reproducible Platform for Continuum Robot Learning via Monolithic 3D Printing and Isomorphic Teleoperation',
    authors: 'Ziyuan Tang, Chenxi Xiao',
    venue: 'IROS', year: 2026, image: '/images/pub_35.jpg',
    tags: ['Continuum Robot', 'Teleoperation', 'Soft Robotics'],
    abstract: 'A reproducible platform for continuum robot learning built from monolithic 3D printing and isomorphic teleoperation. The 3D-printed continuum robot is cheap and easy to reproduce, and the isomorphic teleoperation interface lets humans collect demonstration data to learn continuum-robot control policies.',
    links: { pdf: 'https://arxiv.org/abs/2606.20389', code: '', video: '' },
  },
];
for (const np of NEW_PUBS) {
  if (!data.publications.some(p => p.id === np.id)) {
    // insert at the top (main places newest first)
    data.publications.unshift(np);
  }
}

fs.writeFileSync(YAML_PATH, yaml.dump(data, { lineWidth: -1, noRefs: true, quotingType: '"' }));
console.log('Merged main into branch data.yaml.');
console.log('publications:', data.publications.length, '| news:', data.news.length);
