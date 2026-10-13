async function findKalyani() {
  const queries = [
    'KALYANI Shreya Ghoshal official music video',
    'Kalyani ARJN Shreya Ghoshal',
    'Kalyani song Saniya Iyappan'
  ];
  const seen = new Set();
  for (const q of queries) {
    console.log('--- ' + q + ' ---');
    const res = await fetch('https://www.youtube.com/results?search_query=' + encodeURIComponent(q), {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const text = await res.text();
    const matches = [...text.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
    for (const id of matches) {
      if (seen.has(id)) continue;
      seen.add(id);
      try {
        const o = await fetch('https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + id);
        if (o.ok) {
          const d = await o.json();
          console.log(id, '| Channel:', d.author_name, '| Title:', d.title);
        }
      } catch(e) {}
    }
  }
}

findKalyani();
