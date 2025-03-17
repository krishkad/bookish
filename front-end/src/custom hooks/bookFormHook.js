import { useState } from "react"

export const useBookForm = () => {

    const [bookData , setBookData] = useState({
        bookName: '',
        author: '',
        bookInfo: '',
        price: '',
    });


    const handleChangeData = (e) => {
        const { name, value, type, files } = e.target;
       
            setBookData(prev => ({
                ...prev,
                [name]: value
            }));
    };

   

    return {bookData , handleChangeData , setBookData } 
}