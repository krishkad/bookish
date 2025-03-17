import React from 'react'

const PaginateButton = ({buttonText , buttonState , buttonPos , onClick} ) => {

    const positionClasses = {
        'left': 'rounded-l-md',
        'mid' : '',
        'right' : 'rounded-r-md'
    }

  return (
    <>
        <button
        disabled={buttonState}
        onClick={onClick}
        className={`relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 
        focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 ${positionClasses[buttonPos]} ${buttonState ? 'cursor-not-allowed opacity-50' : ''}`}
        >
            {buttonText}
        </button>
    </>
  )
}

export default PaginateButton