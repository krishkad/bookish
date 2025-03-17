import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import BookCard from '../../components/cards/BookCard';
import { useFetchCartInfoQuery } from '../../redux/slices/services/apiSlice';
import { Grid } from "react-loader-spinner";
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

const UserCart = () => {

    const {data , isLoading } = useFetchCartInfoQuery();
    const userInfo = useSelector((state) => state.userCred.userInfo);

    return (
        <>
            <Helmet>
                <title> {userInfo?.username}' Cart - Bookish</title>
            </Helmet>
            <Navbar isUser={true}/>
            <div className='container mx-auto p-4 mt-24'>
                {
                    isLoading ? (
                        <div className='my-20 flex justify-center'>
                            <Grid
                            visible={true}
                            height="100"
                            width="100"
                            color="blue"
                            />
                        </div>
                    ) : data?.cart?.items?.length === 0 ?(
                        <div className='text-center font-medium my-20'>
                            <p>Empty Cart!!</p>
                        </div>
                    ) : (
                        data?.cart?.items?.map((item) => (
                            <BookCard key={item?._id} isUser={true} data={item.bookId} cart={data?.cart}/>
                        ))
                    )
                }
            </div>
        </>
    )
}

export default UserCart