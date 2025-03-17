import React from 'react'

const Button = ({buttonText}) => {
    return (
        <button  type='submit' 
        className='font-bold py-2 text-center px-4 rounded-md mb-4 w-full hover:scale-95 bg-blue-500 text-white hover:bg-blue-700'>
            {buttonText}
        </button>
    )
}

export default Button