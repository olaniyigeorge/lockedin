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
    <div className='w-full flex flex-col items-center gap-8 py-4 px-2'>
      <h2 className="font-medium text-2xl">Something went wrong!</h2>
      <button
        className="font-extrabold text-xl"
        onClick={
            () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}