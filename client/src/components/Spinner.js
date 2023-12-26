import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
export default function Spinner() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <ClipLoader
            color="#C62A5B"
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
            
          />
          <h1>Loading...</h1>
    </div>
    
  )
}
