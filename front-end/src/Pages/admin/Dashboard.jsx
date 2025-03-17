import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import BookCard from '../../components/cards/BookCard'
import { Grid } from "react-loader-spinner";
import { useGetBooksQuery } from '../../redux/slices/services/adminApiSlice'
import Pagination from '../../components/pagination/Pagination';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    
    const [currentPage , setCurrentPage] = useState( 1);
    const {data , isError ,  isLoading} = useGetBooksQuery({page: currentPage , limit: 4})

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <>
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>
            <Navbar isUser={false}/>
            <div className='container mx-auto p-4 mt-24'>
                {
                    isLoading ? (
                        <div className='flex justify-center my-20'>
                            <Grid
                            visible={true}
                            height="100"
                            width="100"
                            color="blue"
                            />
                        </div>
                    ) :isError ? (
                        <div className='text-center font-medium my-20'>
                            <p>Failed to load data, please try later</p>
                        </div>
                    ) : (
                        data?.books?.map((book) => (
                            <BookCard key={book?._id} isUser={false} data={book}  />
                        ))
                    )
                }
            </div>
            <Pagination
            currentPage={data?.currentPage || currentPage}
            totalPages={data?.totalPages}
            onPageChange={handlePageChange}
            />
        </>
    )
}

export default Dashboard