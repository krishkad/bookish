import React from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { ImCart } from "react-icons/im";
import { BsCartXFill } from "react-icons/bs";
import { confirmDeletion, displaySuccessAlert, showInfo, triggerErrorAlert } from '../../utils/alertUtils';
import { useDeleteBookMutation } from '../../redux/slices/services/adminApiSlice';
import { useNavigate } from 'react-router-dom';
import { useAddAndRemoveFromCartMutation } from '../../redux/slices/services/apiSlice';

const BookCard = ({isUser , data , cart}) => {

    const navigate = useNavigate();
    const [deleteBook ] = useDeleteBookMutation();
    const [addAndRemoveFromCart] = useAddAndRemoveFromCartMutation();

    // to delete a book
    const handleBookDeletion = async (bookId) => {
        const result = await confirmDeletion();
        if(result.isConfirmed){
            try {
                const response = await deleteBook(bookId).unwrap();
                displaySuccessAlert(response.message);
            } catch (error) {
                if(error.data.error) {
                    console.log(error)
                    triggerErrorAlert(error.data.error)
                } else {
                    triggerErrorAlert(error.statusText);
                }
            }
        }
    }

    // to check is in cart
    const isInCart = cart?.items?.map((item => item?.bookId?._id === data?._id))

    // Add or remove from cart
    const toggleItemToOrFromCart = async (bookId) => {
        try {
            const response = await addAndRemoveFromCart(bookId);
            if(response.data?.message){
                showInfo(response.data?.message);
            }
            if(response.error){
                triggerErrorAlert(response.error.data.error)
            }
        } catch (error) {
            if(error.data.error) {
                console.log(error)
                triggerErrorAlert(error.data.error)
            } else {
                triggerErrorAlert(error.statusText);
            }
        }
    }


    // navigate to edit page
    const moveToEditPage = (id) => {
        navigate(`/admin/edit_item/${id}`);
    }


  return (
    <div className='flex justify-center mb-8'>
        <div className='w-full md:w-2/3 bg-neutral-100 rounded-lg shadow-md p-4'>
            <div className='flex flex-col md:flex-row'>

                {/* First section */}
               { /*<div className='w-full md:w-1/4 p-2'>
                    <div className='bg-gray-200 h-48 md:h-full rounded-md'>
                        <img src={data?.image} alt="book_image" className='inset-0 w-full h-full object-cover' />
                    </div>
                </div> */}

                {/* Second Section */}
                <div className='w-full md:w-3/4 p-2 flex flex-col justify-between'>
                    <div>
                        <h2 className="text-xl font-bold mb-2">{data?.bookName}</h2>
                        <h3 className="text-md text-gray-600 mb-2">Author: {data?.author}</h3>
                        <h3 className='text-md text-gray-600 mb-2'>Rs. {data?.price}</h3>
                        <p className="text-gray-800 mb-4">
                            {data?.bookInfo}
                        </p>
                    </div>
                    <div className='flex justify-start space-x-2'>
                        {isUser ? (
                            <>
                            {isInCart ? (
                                <button onClick={() => toggleItemToOrFromCart(data?._id)} title='remove from cart' className='bg-red-500 text-white px-4 py-2 rounded shadow-md hover:scale-90'>
                                    <BsCartXFill size={20}/>
                                </button>
                            ) : (
                                <button onClick={() => toggleItemToOrFromCart(data?._id)} onC title='Add to cart' className='bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:scale-90'>
                                    <ImCart size={20}/>
                                </button>
                            )}
                            </>
                        ) : (
                            <>
                                <button onClick={() => moveToEditPage(data?._id)} title='Edit' className='bg-green-500 text-white px-4 py-2 rounded shadow-md hover:scale-90'>
                                    <FiEdit size={20}/>
                                </button>
                                <button onClick={() => handleBookDeletion(data?._id)} title='Delete' className='bg-red-500 text-white px-4 py-2 rounded shadow-md hover:scale-90'>
                                    <MdDelete size={20}/>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookCard