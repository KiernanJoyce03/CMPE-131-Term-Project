import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CardContainer from '../../components/CardContainer'
import { Skeleton } from '@/components/ui/skeleton'

function SearchResultPage() {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const query = searchParams.get('q')

  useEffect(() => {
    if (!query) return
    const fetchBooks = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`/api/books/search?q=${encodeURIComponent(query)}&limit=40`)
        const data = await res.json()
        setResults(data.books ?? [])
      } catch (err) {
        setError('Failed to fetch results')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [query])

  return (
    <div className='px-10 py-10 flex flex-col gap-8'>

      {/* Header row */}
      <div>
        <div className='inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-3 py-1 text-[0.72rem] text-foreground/60 tracking-widest uppercase font-medium mb-3'>
          <span className='w-1.5 h-1.5 rounded-full bg-accent' />
          Search Results
        </div>
        <div className='flex items-center gap-3'>
          <h2 className='font-syne text-2xl font-extrabold tracking-tight'>
            "{query}"
          </h2>
          {!loading && results.length > 0 && (
            <span className='text-sm text-foreground/40 font-dm-sans'>
              {results.length} books found
            </span>
          )}
          <div className='flex-1 h-px bg-border/40' />
        </div>
      </div>

      {error && (
        <p className='text-sm text-destructive font-dm-sans'>{error}</p>
      )}

      {/* Grid */}
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8'>
        {loading
          ? Array.from({ length: 18 }).map((_, i) => (
              <Skeleton key={i} className='w-full aspect-2/3 rounded-lg' />
            ))
          : results.length === 0
            ? (
              <div className='col-span-6 flex flex-col items-center py-20 gap-3'>
                <p className='font-syne text-xl font-bold text-foreground/30'>No results found</p>
                <p className='text-sm text-foreground/30 font-dm-sans'>Try a different search term</p>
              </div>
            )
            : results.map((book) => (
                <div key={book.id} className='flex flex-col gap-2'>
                  <CardContainer book={book} />
                  <div className='px-0.5'>
                    <p className='text-xs font-semibold text-foreground/80 truncate leading-tight'>
                      {book.title}
                    </p>
                    <p className='text-xs text-foreground/40 truncate font-dm-sans'>
                      {book.author}
                    </p>
                  </div>
                </div>
              ))
        }
      </div>
    </div>
  )
}

export default SearchResultPage
