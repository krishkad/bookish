import React from 'react'
import { NavLink } from "react-router-dom";

const NavList = ({listTitle, to}) => {
  return (
    <NavLink to={to}>
        <li className='text-white hover:text-blue-200'>
            {listTitle}
        </li>
    </NavLink>
  )
}

export default NavList