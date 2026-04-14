const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

const searchBooks = async (req, res) => {
    const { q, startIndex = 0 } = req.query;
    const response = await fetch(`${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(q)}&maxResults=10&startIndex=${startIndex}&key=${API_KEY}`);
    const data = await response.json();
    res.json(data);
};

const getBooksByCategory = async (req, res) => {
    const { category, startIndex = 0 } = req.query;
    const response = await fetch(`${GOOGLE_BOOKS_API_URL}?q=subject:${encodeURIComponent(category)}&maxResults=10&startIndex=${startIndex}&key=${API_KEY}`);
    const data = await response.json();
    res.json(data);
}


export{
    searchBooks,
    getBooksByCategory
};