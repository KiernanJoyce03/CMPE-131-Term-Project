import React, {useState, useSearchParams, useEffect} from 'react'




function searchResultPage() {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState([])
  const query = searchParams.get("q")

  useEffect(() => {
    if (query) {
      fetchBooks(query)
    }
  }, [query])

  const fetchBooks = async (query) => {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${query}&limit=40`
    )
    const data = await res.json()
    setResults(data.docs) // array of book objects
  }


  return (
    <div>
      <div className='grid grid-cols-5 gap-4'>
        {(results || []).map((book, index) => (
          <CardContainer index={index} book={book}/>
        ))}
      </div>


    </div>
  )
}

export default searchResultPage