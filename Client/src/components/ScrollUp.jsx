import React from 'react'

export const ScrollUp = () => {

  const handleClick = () => {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    })
  }

  return (
    <div className='scroll-up' onClick={handleClick}>
        <svg  className='scroll-up__svg' viewBox="-2 -2 52 52">
            <path 
                className='scroll-up__svg-path'
                d="
                    M24,0
                    a24,24 0 0,1 0,48
                    a24,24 0 0,1 0,-48
                ">
            </path>
        </svg>
    </div>
  )
}

