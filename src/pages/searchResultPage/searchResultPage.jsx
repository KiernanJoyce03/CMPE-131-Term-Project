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
    <div className='px-10 py-8'>
      <div className='flex items-center gap-3 mb-6'>
        <span className='text-sm uppercase tracking-widest text-accent font-semibold'>
          Results for "{query}"
        </span>
        <div className='flex-1 h-px bg-border/40' />
      </div>

      {error && <p className='text-destructive text-sm'>{error}</p>}

      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {loading
          ? Array.from({ length: 18 }).map((_, i) => (
              <Skeleton key={i} className='w-full aspect-2/3 rounded-lg' />
            ))
          : results.map((book) => (
              <CardContainer key={book.id} book={book} />
            ))
        }
      </div>
    </div>
  )
}

export default SearchResultPage
