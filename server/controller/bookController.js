const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

const searchBooks = async (req, res) => {
    try {
        const { q, startIndex = 0 } = req.query;
        const response = await fetch(`${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(q)}&maxResults=10&startIndex=${startIndex}&key=${API_KEY}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('searchBooks error:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

const getBooksByCategory = async (req, res) => {
    try {
        const { category, startIndex = 0 } = req.query;
        const response = await fetch(`${GOOGLE_BOOKS_API_URL}?q=subject:${encodeURIComponent(category)}&maxResults=10&startIndex=${startIndex}&key=${API_KEY}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('getBooksByCategory error:', error);
        res.status(500).json({ error: 'Failed to fetch books by category' });
    }
}


export{
    searchBooks,
    getBooksByCategory
};