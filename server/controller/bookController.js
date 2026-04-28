const OL_SEARCH = 'https://openlibrary.org/search.json';
const OL_SUBJECT = 'https://openlibrary.org/subjects';

// Normalize a raw Open Library doc into a consistent shape
function formatBook(doc) {
  return {
    id: doc.key,                          // e.g. "/works/OL45804W"
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
      q,
      limit,
      offset,
      fields: 'key,title,author_name,cover_i,first_publish_year,subject',
    });
    if (sort) params.set('sort', sort);           // new, rating, old, random
    if (language) params.set('language', language); // eng, spa, fra, etc.

    const response = await fetch(`${OL_SEARCH}?${params}`);
    const data = await response.json();

    res.json({
      total: data.numFound,
      offset: data.start,
      books: (data.docs ?? []).map(formatBook),
    });
  } catch (error) {
    console.error('searchBooks error:', error);
    res.status(500).json({ error: 'Failed to search books' });
  }
};

// GET /api/books/subject/:subject?limit=20&offset=0
const getBooksBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const { limit = 20, offset = 0 } = req.query;

    const params = new URLSearchParams({ limit, offset });
    const response = await fetch(`${OL_SUBJECT}/${encodeURIComponent(subject)}.json?${params}`);
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
    console.error('getBooksBySubject error:', error);
    res.status(500).json({ error: 'Failed to fetch books by subject' });
  }
};

// GET /api/books/trending?limit=20
// Uses sort=rating on the search API as a proxy for popular books
const getTrending = async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const params = new URLSearchParams({
      q: 'fiction',
      sort: 'rating',
      limit,
      fields: 'key,title,author_name,cover_i,first_publish_year,subject',
    });
    const response = await fetch(`${OL_SEARCH}?${params}`);
    const data = await response.json();
    res.json({ total: data.numFound, books: (data.docs ?? []).map(formatBook) });
  } catch (error) {
    console.error('getTrending error:', error);
    res.status(500).json({ error: 'Failed to fetch trending books' });
  }
};

// GET /api/books/work/:id  (id = OL45804W, without the /works/ prefix)
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const [workRes, ratingsRes] = await Promise.all([
      fetch(`https://openlibrary.org/works/${id}.json`),
      fetch(`https://openlibrary.org/works/${id}/ratings.json`),
    ]);
    const work = await workRes.json();
    const ratings = await ratingsRes.json();

    const coverId = work.covers?.[0];

    res.json({
      id: `/works/${id}`,
      title: work.title,
      description: typeof work.description === 'string'
        ? work.description
        : work.description?.value ?? null,
      coverUrl: coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : null,
      subjects: work.subjects?.slice(0, 10) ?? [],
      rating: ratings.summary?.average ?? null,
      ratingCount: ratings.summary?.count ?? 0,
    });
  } catch (error) {
    console.error('getBookById error:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

export { searchBooks, getBooksBySubject, getTrending, getBookById };
