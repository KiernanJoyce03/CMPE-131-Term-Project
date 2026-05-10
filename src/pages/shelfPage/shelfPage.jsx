import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import BookGrid from '../../components/BookGrid'

const STATUS_LABELS = {
  WANT_TO_READ: 'Want to Read',
  READING: 'Reading',
  COMPLETED: 'Completed',
  DROPPED: 'Dropped',
}

function ShelfPage() {
  const { username } = useParams()
  const navigate = useNavigate()
  const [shelf, setShelf] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    const fetchShelf = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/shelf', { credentials: 'include' })
        const data = await res.json()
        setShelf(data.data?.shelf ?? [])
      } catch (err) {
        console.error('Failed to fetch shelf:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchShelf()
  }, [username])

  const filtered = filter === 'ALL' ? shelf : shelf.filter((e) => e.status === filter)

  return (
    <div className='px-10 py-10 flex flex-col gap-8'>

      {/* Header */}
      <div>
        <div className='inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-3 py-1 text-[0.72rem] text-foreground/60 tracking-widest uppercase font-medium mb-3'>
          <span className='w-1.5 h-1.5 rounded-full bg-accent' />
          Shelf
        </div>
        <div className='flex items-center gap-3'>
          <h2 className='font-syne text-2xl font-extrabold tracking-tight'>
            {username}
          </h2>
          {!loading && (
            <span className='text-sm text-foreground/40 font-dm-sans'>
              {shelf.length} {shelf.length === 1 ? 'book' : 'books'}
            </span>
          )}
          <div className='flex-1 h-px bg-border/40' />
        </div>
      </div>

      {/* Status filter pills */}
      <div className='flex flex-wrap gap-2'>
        {['ALL', ...Object.keys(STATUS_LABELS)].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-full text-xs border transition-colors ${
              filter === s
                ? 'bg-accent text-white border-accent'
                : 'border-white/10 text-foreground/50 hover:border-accent/40 hover:text-foreground'
            }`}
          >
            {s === 'ALL' ? 'All' : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8'>
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className='w-full aspect-2/3 rounded-lg' />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className='flex flex-col items-center py-20 gap-3'>
          <p className='font-syne text-xl font-bold text-foreground/30'>Nothing here yet</p>
          <p className='text-sm text-foreground/30 font-dm-sans'>Add books from any book page</p>
        </div>
      ) : (
        <BookGrid
          books={filtered.map((entry) => ({
            id: entry.bookId,
            title: entry.book.title,
            author: entry.book.author,
            coverUrl: entry.book.coverUrl,
          }))}
          onBookClick={(book) => navigate(`/home/book/${book.id.replace('/works/', '')}`, { state: { author: book.author } })}
        />
      )}
    </div>
  )
}

export default ShelfPage
