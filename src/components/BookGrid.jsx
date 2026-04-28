import { useRef, useState, useCallback } from "react"
import BookCard from "./BookCard"

const SHIFT = 28

export default function BookGrid({ books, onBookClick }) {
  const refs = useRef([])
  const [hoveredIdx, setHoveredIdx] = useState(null)

  const getShift = useCallback((i) => {
    if (hoveredIdx === null) return 0
    const diff = i - hoveredIdx
    if (diff === 0) return 0
    if (diff < 0) return -SHIFT * Math.max(0, 1 - Math.abs(diff) * 0.4)
    return  SHIFT * Math.max(0, 1 - Math.abs(diff) * 0.4)
  }, [hoveredIdx])

  return (
    <div
      className="flex flex-wrap gap-x-10 gap-y-12 justify-start"
      style={{ paddingBottom: 32 }}
    >
      {books.map((book, i) => (
        <BookCard
          key={book.id}
          ref={(el) => (refs.current[i] = el)}
          title={book.title}
          author={book.author}
          coverUrl={book.coverUrl}
          seed={i + 1}
          shiftX={getShift(i)}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
          onClick={() => onBookClick?.(book)}
        />
      ))}
    </div>
  )
}
