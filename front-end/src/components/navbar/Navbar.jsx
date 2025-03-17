import React , {useState} from 'react'
import NavList from '../texts/NavList'
import { useDispatch } from 'react-redux';
import { removeInfo } from '../../redux/slices/states/authSlice';
import { useNavigate } from 'react-router-dom';
import { deleteAdminInfo } from '../../redux/slices/states/adminSlice';

const Navbar = ({isUser}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [navMenu , setNavMenu] = useState(false);

    const handleLogout = () => {
        if(isUser) {
            dispatch(removeInfo());
            navigate('/login');
        } else {
            dispatch(deleteAdminInfo());
            navigate('/admin');
        }
    }

    return (
        <>
        <nav className='fixed w-full bg-blue-700 p-6 top-0 z-10'>
            <div className='container mx-auto flex justify-between items-center md:justify-evenly'>
                <div className='text-white text-lg font-bold'>
                    {isUser ? 'WELCOME TO BOOKISH' : 'HELLO, ADMIN'}
                </div>
                <ul className='hidden md:flex space-x-8'>
                    {isUser ? (
                        <>
                            <NavList listTitle={'PROFILE'} to={'/home'}/>
                            <NavList listTitle={'YOUR CART'} to={'/cart'}/>
                        </>
                    ) : (
                        <>
                            <NavList listTitle={'DASHBOARD'} to={'/admin/dashboard'}/>
                            <NavList listTitle={'ADD YOUR ITEM'} to={'/admin/add_item'}/>
                            <NavList listTitle={'CHECK OUTS'}/>
                        </>
                    )}
                    <button onClick={handleLogout} className='px-4 py-2 text-black bg-white rounded-md font-semibold hover:scale-95'>
                        Logout
                    </button>
                </ul>
                
                <div className='md:hidden'>
                    <button onClick={() => setNavMenu(!navMenu)} className='text-white focus:outline-none'>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M4 6h16M4 12h16m-7 6h7">
                        </path>
                    </svg>
                    </button>
                </div>
            </div>

            {navMenu && (
                <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                    navMenu ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <ul className='space-y-4 mt-4'>
                        {isUser ? (
                            <>
                            <NavList listTitle={'PROFILE'} to={'/home'}/>
                            <NavList listTitle={'YOUR CART'} to={'/cart'}/>
                            </>
                        ) : (
                            <>
                            <NavList listTitle={'DASHBOARD'} to={'/admin/dashboard'}/>
                            <NavList listTitle={'ADD YOUR ITEM'} to={'/admin/add_item'}/>
                            <NavList listTitle={'CHECK OUTS'}/>
                            </>
                        )}
                        <button onClick={handleLogout} className='px-4 py-2 text-black bg-white rounded-md font-semibold hover:scale-95'>
                            Logout
                        </button>
                    </ul>
                </div>
            )}    
        </nav>
        </>
    )
}

export default Navbar