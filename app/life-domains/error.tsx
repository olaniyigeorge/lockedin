'use client'
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <h2 className='text-3xl font-extrabold'>Something went wrong in Life Domains !</h2>
      <button
        onClick={
            () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}