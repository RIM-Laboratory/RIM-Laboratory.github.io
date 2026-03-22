const fs = require('fs');

const dataTsContent = fs.readFileSync('src/data.ts', 'utf8');
const parsedPubs = JSON.parse(fs.readFileSync('parsed_pubs.json', 'utf8'));

// Find the start and end of the publications array
const pubStart = dataTsContent.indexOf('export const publications = [');
const pubEnd = dataTsContent.indexOf('];', pubStart) + 2;

const newPubsStr = `export const publications = ${JSON.stringify(parsedPubs, null, 2)};`;

const newDataTsContent = dataTsContent.slice(0, pubStart) + newPubsStr + dataTsContent.slice(pubEnd);

fs.writeFileSync('src/data.ts', newDataTsContent);
