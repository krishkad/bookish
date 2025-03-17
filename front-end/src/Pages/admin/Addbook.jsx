import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Inputfield from '../../components/fields/Inputfield'
import Button from '../../components/buttons/Button'
import { ThreeDots } from "react-loader-spinner";
import { useBookForm } from '../../custom hooks/bookFormHook'
import { useAddBookMutation, useGetSingleBookQuery, useUpdateBookMutation } from '../../redux/slices/services/adminApiSlice'
import { displaySuccessAlert, triggerErrorAlert } from '../../utils/alertUtils'
import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from "react-loader-spinner";
import { Helmet } from 'react-helmet-async';

const Addbook = () => {

    const {id} = useParams();
    const {bookData , handleChangeData, setBookData } = useBookForm();
    const navigate = useNavigate();
    const [addBook , {isLoading}] = useAddBookMutation()
    const {data , isLoading: isEditDataFetchning} = useGetSingleBookQuery(id);
    const [updateBook , {isLoading: isUpdating}] = useUpdateBookMutation()

    useEffect(() => {
        if(data) {
            setBookData({
                bookName: data?.book?.bookName,
                bookInfo: data?.book?.bookInfo,
                author: data?.book?.author,
                price: data?.book?.price,
            })
        }
    },[data , setBookData]);

    const handleSubmit =  async (e) => {
        e.preventDefault();

        if(parseInt(bookData.price) <= 0) {
            triggerErrorAlert('Invalid price entry');
            return;
        }

        try {
            let response = null;

            if(id) {
                console.log("id found");
                response = await updateBook({id, ...bookData }).unwrap();
            }else {
                console.log("id missing");
                // let imageUrl = bookData.image;
                // console.log(imageUrl , 'url avde')

                // if(bookData.image instanceof File) {
                //     setUploadingImg(true);
                //     const storageRef = ref(storage , `book_Images/${bookData.image.name}`);
                //     await uploadBytes(storageRef , bookData.image);
                //     imageUrl = await getDownloadURL(storageRef);
                //     setUploadingImg(false);
                // } else {
                //     triggerErrorAlert('Upload errr');
                //     return;
                // }
                response = await addBook({bookData}).unwrap();
            }
            displaySuccessAlert(response.message);
            navigate('/admin/dashboard');
        } catch (error) {
            if(error?.data?.error) {
                triggerErrorAlert(error?.data?.error);
            } else {
                triggerErrorAlert(error?.statusText);
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>{id ? `Update - ${data?.book?.bookName} || Update Book Details` : 'Add Book'}</title>
            </Helmet>
            <Navbar isUser={false}/>
            <div className='container mx-auto p-4 mt-24 flex justify-center'>

                <div className='w-full md:w-1/2 bg-neutral-100 border border-gray-300 rounded-lg shadow-lg p-6'>
                    <h2 className='text-2xl font-bold mb-8'>
                        { id ? 'UPDATE BOOK' : 'ADD YOUR BOOK'}
                    </h2>
                    {id && isEditDataFetchning ? (
                        <div className='flex justify-center my-20'>
                            <Grid
                            visible={true}
                            height="100"
                            width="100"
                            color="blue"
                            />
                        </div>
                    ) : (
                        <>
                        <form onSubmit={handleSubmit} className='space-y-5'>
                            <Inputfield
                            labelFor={'bookName'} labelName={'Name of the book'}
                            placeholder={'Alchemist'}
                            type={'text'}
                            name={'bookName'}
                            value={bookData.bookName}
                            onChange={handleChangeData}
                            />
                            <Inputfield 
                            labelFor={'author'} labelName={'Author of the book'}
                            placeholder={'Paulo Choelo'}
                            name={'author'}
                            value={bookData.author}
                            onChange={handleChangeData}
                            />
                            <Inputfield 
                            labelFor={'bookInfo'} labelName={'About the book'}
                            placeholder={'....'}
                            name={'bookInfo'}
                            value={bookData.bookInfo}
                            onChange={handleChangeData}
                            />
                            <Inputfield
                            labelFor={'price'} labelName={'Price of the book'}
                            placeholder={'320'}
                            name={'price'}
                            value={bookData.price}
                            onChange={handleChangeData}
                            />
                            {/* {!id && (
                                <div className='flex flex-col md:flex-row items-center'>
                                    <div className='flex-1'>
                                        <Inputfield
                                        labelFor={'image'} labelName={'Enter image'}
                                        placeholder={'Choose'}
                                        name={'image'}
                                        type={'file'}
                                        onChange={handleChangeData}
                                        />
                                    </div>
                                    {imgPreview && (
                                        <div className='relative mt-4 md:mt-0 md:ml-4'>
                                            <img src={imgPreview} alt="Preview" className='w-32 h-32 object-cover rounded-md shadow-md' />
                                            <button
                                                type="button"
                                                onClick={clearImg}
                                                className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs transform translate-x-1/2 -translate-y-1/2'>
                                                X
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )} */}
                            {
                                isLoading || isUpdating? (
                                    <ThreeDots
                                    visible={true}
                                    ariaLabel="three-dots-loading"
                                    height="50"
                                    width="50"
                                    color='blue'
                                    />
                                ) : (
                                    <Button buttonText={id ? 'UPDATE' : 'ADD'}/>
                                )
                            }
                        </form>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Addbook