import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import BookCard from '../../components/cards/BookCard'
import Searchfield from '../../components/fields/Searchfield'
import { useBooksForUsersQuery } from '../../redux/slices/services/apiSlice'
import {Grid} from 'react-loader-spinner'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'

const UserHome = () => {

  const {data , isLoading , isError} = useBooksForUsersQuery()
  const userInfo = useSelector((state) => state.userCred.userInfo)
  return (
    <>
      <Helmet>
        <title>Welcome {userInfo?.username}</title>
      </Helmet>
        <Navbar isUser={true}/>
        <div className='container mx-auto p-4 mt-24'>
          <Searchfield/>

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
              <BookCard key={book?._id} isUser={true} data={book}  />
            ))
          )
        }
        </div>
    </>
  )
}

export default UserHome