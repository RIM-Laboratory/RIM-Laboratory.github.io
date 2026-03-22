const fs = require('fs');
fetch('https://api.semanticscholar.org/graph/v1/author/search?query=Chenxi+Xiao&fields=name,papers.title,papers.year,papers.authors,papers.venue,papers.abstract,papers.url')
  .then(r => r.json())
  .then(d => fs.writeFileSync('semantic_papers.json', JSON.stringify(d, null, 2)))
  .catch(e => console.error(e));
