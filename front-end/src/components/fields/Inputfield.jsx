import React from 'react'

const Inputfield = ({labelFor , labelName , type , placeholder , name ,  value , onChange}) => {
    return (
        <>
            <div className='space-y-1'>
                <label className='' htmlFor={labelFor}>{labelName}</label>
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    onChange={onChange}
                    value={value}
                    required
                    className='px-4 py-2 border border-gray-300 rounded-md w-full'
                />
            </div>
        </>
    )
}

export default Inputfield