import React, { useEffect, useReducer, useState } from 'react'
import Inputfield from '../../components/fields/Inputfield'
import AuthNavText from '../../components/texts/AuthNavText'
import Button from '../../components/buttons/Button'
import { ThreeDots } from "react-loader-spinner";
import { useAuthForm } from '../../custom hooks/authFormhook'
import { displaySuccessAlert, triggerErrorAlert } from '../../utils/alertUtils'
import { useLoginUserMutation } from '../../redux/slices/services/apiSlice'
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/slices/states/authSlice';
import { useNavigate  , Link} from 'react-router-dom';
import { setadminInfo } from '../../redux/slices/states/adminSlice';
import { useAdminLoginMutation } from '../../redux/slices/services/adminApiSlice';
import { Helmet } from 'react-helmet-async';

const Login = ({isUser}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userData , handleChangeData} = useAuthForm();
    const [loginUser , {isLoading}] = useLoginUserMutation();
    const [adminLogin ] = useAdminLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if(!userData.email || !userData.password) {
                triggerErrorAlert('Fill all the fields');
                return;
            }

            let result = null;
            if(isUser) {
                console.log({isUser})
                result = await loginUser(userData).unwrap();
                localStorage.setItem('userrToken' , result.token);
                dispatch(setUserInfo(result.payload));
                navigate('/home');
            } else {
                console.log({isUser})
                result = await adminLogin(userData).unwrap()
                localStorage.setItem('adminToken' , result.token);
                dispatch(setadminInfo(result.payload));
                navigate('/admin/dashboard');
            }
            displaySuccessAlert(result.message);

        } catch (error) {
            if(error.data.error) {
                triggerErrorAlert(error.data.error)
            } else {
                triggerErrorAlert(error.statusText);
            }
        }
    }
    return (
        <>
            <Helmet>
                <title>{isUser ? 'User Login' : 'Admin Management'}</title>
            </Helmet>
            <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-t from-[#E9E4F0] to-[#D3CCE3]'>
                <h2 className='text-2xl font-semibold font-mono mb-4 text-center'>
                    {isUser ? 'LOGIN TO YOUR ACCOUNT' : 'ADMIN MANAGEMENT'}
                </h2>
                <div className='max-w-md w-full space-y-8 p-6 border border-gray-300 rounded-md shadow-lg bg-neutral-100'>
                    <form onSubmit={handleSubmit} className='space-y-8'>
                        <Inputfield 
                        labelFor={'email'} labelName={'Enter email'}
                        type={'email'}
                        name={'email'}
                        placeholder={'user@gmail.com'}
                        value={userData.email}
                        onChange={handleChangeData}
                        />
                        <Inputfield
                        labelFor={'password'} labelName={'Enter password'}
                        type={'password'}
                        name={'password'}
                        placeholder={'*********'}
                        value={userData.password}
                        onChange={handleChangeData}
                        />
                        {isLoading ? (
                            <ThreeDots
                            visible={true}
                            ariaLabel="three-dots-loading"
                            height="50"
                            width="50"
                            color='blue'
                            />
                        ) : (
                            <Button buttonText={'LOGIN'}/>
                        )}
                    </form>
                        <AuthNavText isLogin={true} />
                    {isUser && (
                        <p className='mt-4 text-gray-500 text-sm'>
                            Check on Admin side - <Link to={'/admin'} className="text-blue-500">Admin</Link>
                        </p>
                    )}    
                </div>
            </div>
        </>
    )
}

export default Login