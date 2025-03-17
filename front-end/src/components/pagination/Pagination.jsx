import React from 'react'
import PaginateButton from '../buttons/PaginateButton';

const Pagination = ({currentPage , totalPages, onPageChange}) => {

    if(totalPages === 0) return null;

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages ;

    const handlePageChange = (page) => {
        onPageChange(page)
    }

    return (
        <>
            <div className='flex justify-center my-8'>
                <nav className='relative z-0 inline-flex shadow-sm'>
                    <PaginateButton
                    buttonText={'Previous'}
                    buttonState={isFirstPage}
                    buttonPos={'left'}
                    onClick={() => handlePageChange(currentPage - 1)}
                    />
                    {
                        [...Array(totalPages).keys()].map((index) => (
                            <PaginateButton
                            key={index + 1}
                            buttonText={index + 1}
                            buttonState={false}
                            buttonPos={'mid'}
                            onClick={() => handlePageChange(index + 1)}
                            />
                        ))
                    }
                    <PaginateButton
                    buttonText={'Next'}
                    buttonState={isLastPage}
                    buttonPos={'right'}
                    onClick={() => handlePageChange(currentPage + 1)}
                    />
                </nav>
            </div>
        </>
    )
}

export default Pagination