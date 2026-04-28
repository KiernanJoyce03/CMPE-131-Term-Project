import React , {useEffect} from 'react'
import { useParams } from 'react-router-dom'

function BookPage() {
  const { id } = useParams();

  useEffect(() => {
    // Fetch book details using the id
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`/api/books/work/${id}`)
        const data = await res.json()
        console.log(data) // For now, just log the data
      } catch (err) {
        console.error('Failed to fetch book details:', err)
      }
    }

    fetchBookDetails()
  }, [id])

  return (
    <div>
      

    </div>
  )
}

export default BookPage