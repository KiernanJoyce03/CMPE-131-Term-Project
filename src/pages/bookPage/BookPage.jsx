import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import LoginPopup from '../../components/LoginPopup'
import SignupPopup from '../../components/SignupPopup'

function StarRating({ rating }) {
  const stars = Math.round((rating / 5) * 5)
  return (
    <div className='flex gap-0.5'>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-lg ${i < stars ? 'text-accent' : 'text-foreground/20'}`}>★</span>
      ))}
    </div>
  )
}

function BookPage() {
  const { id } = useParams()
  const isLoggedIn = useSelector((state) => state.userStatus.isLoggedIn)
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/books/work/${id}`)
        const data = await res.json()
        setBook(data)
      } catch (err) {
        console.error('Failed to fetch book details:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBookDetails()
  }, [id])

  if (loading) return (
    <div className='px-10 py-12 flex gap-10'>
      <Skeleton className='w-48 h-72 rounded-lg shrink-0' />
      <div className='flex flex-col gap-4 flex-1'>
        <Skeleton className='h-8 w-64' />
        <Skeleton className='h-4 w-40' />
        <Skeleton className='h-24 w-full' />
      </div>
    </div>
  )

  if (!book) return (
    <div className='px-10 py-12 text-foreground/40 font-dm-sans'>Book not found.</div>
  )

  return (
    <div className='min-h-screen bg-background'>

      {/* Blurred cover backdrop */}
      {book.coverUrl && (
        <div
          className='absolute inset-0 h-105 bg-cover bg-center opacity-10 blur-2xl pointer-events-none'
          style={{ backgroundImage: `url(${book.coverUrl})` }}
        />
      )}

      <div className='relative px-10 py-12 max-w-6xl mx-auto flex flex-col gap-10'>

        {/* Main section */}
        <div className='flex gap-10 items-start'>

          {/* Cover */}
          <div className='shrink-0'>
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                className='w-44 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
              />
            ) : (
              <div className='w-44 h-64 rounded-lg bg-accent/20 flex items-center justify-center text-foreground/30 text-sm text-center px-4'>
                No cover
              </div>
            )}
          </div>

          {/* Details */}
          <div className='flex flex-col gap-5 flex-1'>

            {/* Title + meta */}
            <div>
              <div className='flex items-baseline gap-3 flex-wrap'>
                <h1 className='font-syne text-3xl font-extrabold tracking-tight'>
                  {book.title}
                </h1>
                {book.year && (
                  <span className='text-foreground/40 text-sm font-dm-sans'>{book.year}</span>
                )}
              </div>
              {book.author && (
                <p className='text-sm text-foreground/50 font-dm-sans mt-1'>
                  by <span className='text-foreground/80'>{book.author}</span>
                </p>
              )}
            </div>

            {/* Description */}
            {book.description && (
              <p className='text-sm text-foreground/60 font-dm-sans leading-relaxed max-w-xl'>
                {book.description.length > 500
                  ? book.description.slice(0, 500) + '…'
                  : book.description}
              </p>
            )}

            {/* Subjects */}
            {book.subjects?.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {book.subjects.map((s) => (
                  <span key={s} className='text-[0.7rem] uppercase tracking-widest bg-accent/10 border border-accent/20 text-foreground/50 px-2.5 py-0.5 rounded-full'>
                    {s}
                  </span>
                ))}
              </div>
            )}

            {/* Auth actions */}
            <div className='flex gap-3 pt-1'>
              {isLoggedIn ? (
                <Button
                  className='bg-accent hover:bg-accent/90 text-white rounded-full px-6 tracking-wide hover:-translate-y-px hover:shadow-[0_4px_20px_#6c63ff44] transition-all duration-200'
                  onClick={() => console.log('Add to shelf — coming soon')}
                >
                  + Add to Shelf
                </Button>
              ) : (
                <div className='flex flex-col gap-2'>
                  <p className='text-xs text-foreground/40 font-dm-sans uppercase tracking-widest'>
                    Sign in to log, rate or review
                  </p>
                  {/* Combined split button */}
                  <div className='flex items-stretch rounded-full border border-white/10 overflow-hidden w-fit'>
                    <button
                      onClick={() => setLoginOpen(true)}
                      className='px-5 py-1.5 text-sm text-foreground/70 hover:bg-accent/10 hover:text-foreground transition-colors duration-150'
                    >
                      Log in
                    </button>
                    <div className='w-px bg-white/10' />
                    <button
                      onClick={() => setSignupOpen(true)}
                      className='px-5 py-1.5 text-sm text-foreground/70 hover:bg-accent/10 hover:text-foreground transition-colors duration-150'
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ratings panel */}
          {book.rating && (
            <div className='shrink-0 flex flex-col items-center gap-2 border border-white/[0.07] rounded-xl px-6 py-5 bg-background/60 backdrop-blur-md min-w-32.5'>
              <p className='text-xs uppercase tracking-widest text-foreground/40 font-dm-sans'>Rating</p>
              <p className='font-syne text-4xl font-extrabold text-foreground'>
                {book.rating.toFixed(1)}
              </p>
              <StarRating rating={book.rating} />
              <p className='text-xs text-foreground/30 font-dm-sans'>
                {book.ratingCount.toLocaleString()} ratings
              </p>
            </div>
          )}
        </div>

      </div>
      <LoginPopup open={loginOpen} onOpenChange={setLoginOpen} />
      <SignupPopup open={signupOpen} onOpenChange={setSignupOpen} />
    </div>
  )
}

export default BookPage
