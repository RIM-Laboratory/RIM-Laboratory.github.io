async function fetchScholar() {
  try {
    const res = await fetch('https://scholar.google.com/citations?user=Qhiy3doAAAAJ&hl=en', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    console.log("HTML length:", html.length);
    console.log("HTML snippet:", html.substring(0, 500));
    
    const rows = html.split('<tr class="gsc_a_tr">').slice(1);
    
    const pubs = rows.map(row => {
      const titleMatch = row.match(/<a href="\/citations\?view_op=view_citation[^>]*class="gsc_a_at"[^>]*>(.*?)<\/a>/);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : '';
      
      const grays = [...row.matchAll(/<div class="gs_gray">(.*?)<\/div>/g)];
      const authors = grays[0] ? grays[0][1].replace(/<[^>]*>/g, '') : '';
      const venue = grays[1] ? grays[1][1].replace(/<[^>]*>/g, '') : '';
      
      const yearMatch = row.match(/<span class="gsc_a_h gsc_a_hc gs_ibl">(.*?)<\/span>/);
      const year = yearMatch ? yearMatch[1].replace(/<[^>]*>/g, '') : '';
      
      return { title, authors, venue, year };
    });
    
    console.log(JSON.stringify(pubs, null, 2));
  } catch (e) {
    console.error(e);
  }
}
fetchScholar();
