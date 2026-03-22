const fs = require('fs');
fetch('https://dblp.org/search/publ/api?q=author:Chenxi_Xiao:&format=json')
  .then(r => r.json())
  .then(d => fs.writeFileSync('papers.json', JSON.stringify(d, null, 2)));
