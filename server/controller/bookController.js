const OL_SEARCH  = 'https://openlibrary.org/search.json';
const OL_SUBJECT = 'https://openlibrary.org/subjects';
const TIMEOUT_MS = 8000;

// Fetch with a timeout and User-Agent — OL blocks requests without one
const fetchOL = (url) =>
  fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { 'User-Agent': 'ShelfPicks/1.0 (kiernanmj007@gmail.com)' },
  });

// Normalize a raw Open Library search doc into a consistent shape
function formatBook(doc) {
  return {
    id: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] ?? 'Unknown',
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
    year: doc.first_publish_year ?? null,
    subjects: doc.subject?.slice(0, 5) ?? [],
  };
}

// GET /api/books/search?q=...&limit=20&offset=0&sort=relevance&language=eng
const searchBooks = async (req, res) => {
  try {
    const { q, limit = 20, offset = 0, sort, language } = req.query;
    if (!q) return res.status(400).json({ error: 'Missing query param: q' });

    const params = new URLSearchParams({
      q, limit, offset,
      fields: 'key,title,author_name,cover_i,first_publish_year,subject',
    });
    if (sort)     params.set('sort', sort);
    if (language) params.set('language', language);

    const response = await fetchOL(`${OL_SEARCH}?${params}`);
    const data = await response.json();

    res.json({
      total: data.numFound,
      offset: data.start,
      books: (data.docs ?? []).map(formatBook),
    });
  } catch (error) {
    console.error('searchBooks error:', error.message);
    res.status(500).json({ error: 'Failed to search books' });
  }
};

// GET /api/books/subject/:subject?limit=20&offset=0
const getBooksBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const { limit = 20, offset = 0 } = req.query;

    const params = new URLSearchParams({ limit, offset });
    const response = await fetchOL(`${OL_SUBJECT}/${encodeURIComponent(subject)}.json?${params}`);
    const data = await response.json();

    const books = (data.works ?? []).map((work) => ({
      id: work.key,
      title: work.title,
      author: work.authors?.[0]?.name ?? 'Unknown',
      coverUrl: work.cover_id
        ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
        : null,
      year: work.first_publish_year ?? null,
      subjects: [],
    }));

    res.json({ total: data.work_count, offset, books });
  } catch (error) {
    console.error('getBooksBySubject error:', error.message);
    res.status(500).json({ error: 'Failed to fetch books by subject' });
  }
};

// GET /api/books/trending
const getTrending = async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const params = new URLSearchParams({
      q: 'fiction', sort: 'rating', limit,
      fields: 'key,title,author_name,cover_i,first_publish_year,subject',
    });
    const response = await fetchOL(`${OL_SEARCH}?${params}`);
    const data = await response.json();
    res.json({ total: data.numFound, books: (data.docs ?? []).map(formatBook) });
  } catch (error) {
    console.error('getTrending error:', error.message);
    res.status(500).json({ error: 'Failed to fetch trending books' });
  }
};

// GET /api/books/work/:id  (id = OL45804W, without /works/ prefix)
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch work + ratings in parallel
    const [workRes, ratingsRes] = await Promise.all([
      fetchOL(`https://openlibrary.org/works/${id}.json`),
      fetchOL(`https://openlibrary.org/works/${id}/ratings.json`),
    ]);

    const [work, ratings] = await Promise.all([
      workRes.json(),
      ratingsRes.json(),
    ]);

    const coverId = work.covers?.[0];

    res.json({
      id: `/works/${id}`,
      title: work.title,
      author: null,
      description: typeof work.description === 'string'
        ? work.description
        : work.description?.value ?? null,
      coverUrl: coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : null,
      subjects: work.subjects?.slice(0, 10) ?? [],
      rating: ratings.summary?.average ?? null,
      ratingCount: ratings.summary?.count ?? 0,
      year: work.first_publish_date ?? null,
    });
  } catch (error) {
    console.error('getBookById error:', error.message);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

export { searchBooks, getBooksBySubject, getTrending, getBookById };
