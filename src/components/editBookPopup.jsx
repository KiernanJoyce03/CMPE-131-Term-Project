import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const STATUSES = [
  { value: 'WANT_TO_READ', label: 'Want to Read' },
  { value: 'READING',      label: 'Reading' },
  { value: 'COMPLETED',    label: 'Completed' },
  { value: 'DROPPED',      label: 'Dropped' },
]

// Strip /works/ prefix so it's safe to put in a URL path
const toUrlId = (id) => id?.replace('/works/', '') ?? id

function EditBookPopup({ open, onOpenChange, book, onDeleted }) {
  const [status, setStatus] = useState('WANT_TO_READ')
  const [rating, setRating] = useState(null)
  const [review, setReview] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // When the popup opens, load the existing shelf entry for this book
  useEffect(() => {
    if (!open || !book?.id) return
    const checkShelf = async () => {
      try {
        const res = await fetch('/api/shelf', { credentials: 'include' })
        const data = await res.json()
        const entry = data.data?.shelf?.find((e) => e.bookId === book.id)
        if (entry) {
          setStatus(entry.status ?? 'WANT_TO_READ')
          setRating(entry.rating ?? null)
          setReview(entry.review ?? '')
        }
      } catch {
        // silently ignore
      }
    }
    checkShelf()
  }, [open, book?.id])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/shelf/${toUrlId(book.id)}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, rating, review }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Failed to update shelf entry')
        return
      }
      onOpenChange(false)
    } catch {
      setError('Failed to update shelf entry')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/shelf/${toUrlId(book.id)}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Failed to remove book')
        return
      }
      onOpenChange(false)
      onDeleted?.()
    } catch {
      setError('Failed to remove book')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-sm border border-white/[0.07] bg-background/95 backdrop-blur-md'>
        <DialogHeader>
          <div className='inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-3 py-1 text-[0.72rem] text-foreground/60 tracking-widest uppercase font-medium w-fit mb-1'>
            <span className='w-1.5 h-1.5 rounded-full bg-accent' />
            Shelf Picks
          </div>
          <DialogTitle className='font-syne text-xl font-extrabold tracking-tight'>
            {book?.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className='flex flex-col gap-4 pt-1'>

          {/* Status */}
          <div className='flex flex-col gap-1.5'>
            <Label className='text-foreground/70 text-xs uppercase tracking-widest font-medium'>
              Status
            </Label>
            <div className='flex flex-wrap gap-2'>
              {STATUSES.map((s) => (
                <button
                  key={s.value}
                  type='button'
                  onClick={() => setStatus(s.value)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                    status === s.value
                      ? 'bg-accent text-white border-accent'
                      : 'border-white/10 text-foreground/50 hover:border-accent/40 hover:text-foreground'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className='flex flex-col gap-1.5'>
            <Label className='text-foreground/70 text-xs uppercase tracking-widest font-medium'>
              Rating
            </Label>
            <div className='flex gap-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  onClick={() => setRating(rating === star ? null : star)}
                  className={`text-2xl transition-colors ${
                    rating >= star ? 'text-accent' : 'text-foreground/20 hover:text-accent/50'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Review */}
          <div className='flex flex-col gap-1.5'>
            <Label className='text-foreground/70 text-xs uppercase tracking-widest font-medium'>
              Review
            </Label>
            <textarea
              rows={3}
              placeholder='Write a short review...'
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className='bg-background/60 border border-white/10 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent/50 resize-none'
            />
          </div>

          {error && <p className='text-sm text-destructive'>{error}</p>}

          <div className='flex gap-2'>
            <Button
              type='submit'
              disabled={loading}
              className='flex-1 bg-accent hover:bg-accent/90 text-white rounded-full tracking-wide hover:-translate-y-px hover:shadow-[0_4px_20px_#6c63ff44] transition-all duration-200'
            >
              {loading ? 'Saving…' : 'Save →'}
            </Button>
            <Button
              type='button'
              disabled={loading}
              onClick={onDelete}
              className='flex-1 bg-destructive/80 hover:bg-destructive text-white rounded-full tracking-wide transition-all duration-200'
            >
              {loading ? 'Removing…' : 'Remove'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditBookPopup
