import React from 'react'
import {Link} from 'react-router-dom'

const AuthNavText = ({isLogin, forAdmin}) => {
    return (
        isLogin ? (
            <p className='mt-4 text-gray-500 text-sm'>
                New User? <Link to={'/'} className="text-blue-500">Register</Link>
            </p>
        ) : (
            <p className='mt-4 text-gray-500 text-sm'>
                Already have an Account? <Link to={'/login'} className="text-blue-500">Login</Link>
            </p>
        )
    )
}

export default AuthNavText