import React from 'react'

const Searchfield = () => {
    return (
        <div className='flex items-center mb-8'>
            <input 
            type="text"
            placeholder='Search...'
            className='border rounded-l px-4 py-2 w-full sm:w-1/2'
            />
            
        </div>
    )
}

export default Searchfield