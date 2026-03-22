const fs = require('fs');

const data = JSON.parse(fs.readFileSync('papers.json', 'utf8'));
const hits = data.result.hits.hit || [];

const publications = hits.map((hit, index) => {
  const info = hit.info;
  
  let authorsStr = "";
  if (info.authors && info.authors.author) {
    if (Array.isArray(info.authors.author)) {
      authorsStr = info.authors.author.map(a => a.text).join(', ');
    } else {
      authorsStr = info.authors.author.text;
    }
  }

  // Remove trailing dot from title
  let title = info.title || "";
  if (title.endsWith('.')) {
    title = title.slice(0, -1);
  }

  return {
    id: index + 1,
    title: title,
    authors: authorsStr,
    venue: info.venue || "Preprint",
    year: parseInt(info.year) || new Date().getFullYear(),
    image: `/images/pub_${index + 1}.jpg`, // Local image path
    abstract: "Abstract not available from DBLP. Please update manually.",
    links: {
      pdf: info.ee || "#",
      code: "",
      video: ""
    }
  };
});

// Sort by year descending
publications.sort((a, b) => b.year - a.year);

console.log(JSON.stringify(publications, null, 2));
