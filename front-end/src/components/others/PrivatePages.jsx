import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate , Outlet } from "react-router-dom";

const PrivatePages = ({isUser}) => {

    const userInfo = useSelector((state) => state.userCred.userInfo);
    const adminInfo = useSelector((state) => state.adminCred.adminData);

    if(isUser) {

        if(userInfo) {
            return <Outlet/>
        } else {
            return <Navigate to={'/login'} replace/>
        }
    } else {
        
        if(adminInfo) {
            return <Outlet/>
        } else {
            return <Navigate to={'/admin'} replace/>
        }
    }
}

export default PrivatePages