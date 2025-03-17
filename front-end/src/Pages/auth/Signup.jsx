import React, { useState } from 'react'
import AuthNavText from '../../components/texts/AuthNavText'
import Inputfield from '../../components/fields/Inputfield'
import Button from '../../components/buttons/Button'
import { ThreeDots } from "react-loader-spinner";
import { useAuthForm } from '../../custom hooks/authFormhook'
import { displaySuccessAlert, showPasswordNeedsAlert, triggerErrorAlert } from '../../utils/alertUtils'
import { useRegisterUserMutation } from '../../redux/slices/services/apiSlice'
import { useNavigate } from 'react-router-dom'
import { isStrongPassword } from '../../utils/passwordUtils';
import { Helmet } from 'react-helmet-async';

const Signup = () => {

    const navigate = useNavigate();
    const {userData , handleChangeData , confirmpassword, confirmpasswordChange} = useAuthForm();
    const [registerUser , {isLoading }] = useRegisterUserMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // Validations for form-data..........................
            if(!userData.email || !userData.password || !userData.username || !confirmpassword) {
                triggerErrorAlert('Invalid Entry');
                return;
            }

            const {isStrong , passwordNeeds} = isStrongPassword(userData.password);
            if(!isStrong) {
                showPasswordNeedsAlert(passwordNeeds);
                return;
            }

            if(userData.password !== confirmpassword) {
                triggerErrorAlert('Password does not match!');
                return;
            }
            // Validations for form-data...........................

            const result = await registerUser(userData).unwrap();
            displaySuccessAlert(result?.message);
            navigate('/login');
            
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
                <title>Create Account - Bookish</title>
            </Helmet>
            <div className='flex flex-col items-center justify-center h-screen  bg-gradient-to-t from-[#E9E4F0] to-[#D3CCE3]'>
                <h2 className='text-2xl font-semibold font-mono mb-4 text-center'>
                    WELCOME TO BOOKISH
                </h2>
                <div className='max-w-md w-full space-y-8 p-6 border border-gray-300 rounded-md shadow-lg bg-neutral-100'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <Inputfield
                        labelFor={'username'} labelName={'Enter name'}
                        placeholder={'John Foe'}
                        type={'text'}
                        name={'username'}
                        value={userData.username}
                        onChange={handleChangeData}
                        />
                        <Inputfield
                        labelFor={'email'} labelName={'Enter email'}
                        placeholder={'user@gmail.com'}
                        type={'email'}
                        name={'email'}
                        value={userData.email}
                        onChange={handleChangeData}
                        />
                        <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                            <Inputfield
                            labelFor={'password'} labelName={'Enter password'}
                            placeholder={'***********'}
                            type={'password'}
                            name={'password'}
                            value={userData.password}
                            onChange={handleChangeData}
                            />
                            <Inputfield
                            labelFor={'confirmpassword'} labelName={'Re-confirm password'}
                            placeholder={'**********'}
                            type={'password'}
                            name={'confirmpassword'}
                            value={confirmpassword}
                            onChange={confirmpasswordChange}
                            />
                        </div>
                        {isLoading? (
                            <ThreeDots
                            visible={true}
                            ariaLabel="three-dots-loading"
                            height="50"
                            width="50"
                            color='blue'
                            />
                        ) : (
                            <Button buttonText={'SIGNUP'}/>
                        )}
                    </form>
                    <AuthNavText isLogin={false}/>
                </div>
            </div>
        </>
    )
}

export default Signup