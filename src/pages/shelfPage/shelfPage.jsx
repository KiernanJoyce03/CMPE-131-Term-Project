import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'

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
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8'>
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className='flex flex-col gap-2 cursor-pointer group'
              onClick={() => navigate(`/home/book/${entry.bookId.replace('/works/', '')}`)}
            >
              {/* Cover */}
              <div className='w-full aspect-2/3 rounded-lg overflow-hidden bg-accent/10 relative'>
                {entry.book.coverUrl ? (
                  <img
                    src={entry.book.coverUrl}
                    alt={entry.book.title}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-foreground/20 text-xs text-center px-2'>
                    No cover
                  </div>
                )}
                {/* Status badge */}
                <span className='absolute bottom-1.5 left-1.5 text-[0.6rem] uppercase tracking-widest bg-black/60 text-white px-2 py-0.5 rounded-full'>
                  {STATUS_LABELS[entry.status]}
                </span>
              </div>

              {/* Info */}
              <div className='px-0.5'>
                <p className='text-xs font-semibold text-foreground/80 truncate leading-tight'>
                  {entry.book.title}
                </p>
                <p className='text-xs text-foreground/40 truncate font-dm-sans'>
                  {entry.book.author}
                </p>
                {entry.rating && (
                  <p className='text-xs text-accent mt-0.5'>
                    {'★'.repeat(entry.rating)}{'☆'.repeat(5 - entry.rating)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ShelfPage
