import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    items: []
}


export const cartSlice = createSlice({
    
    name: 'cart',
    initialState,

    reducers : {
        addtoCart: (state, action) => {

            const {_id , bookName , bookInfo, author, price, image} = action.payload;

            const existingItem = state.items?.find((item) => item?._id === _id);
            if(!existingItem) {
                state.items?.push({_id , bookName, bookInfo, author, price , image});
            }
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.items = state.items?.filter((item) => item._id !== itemId);
        }
    }
});

export const { addtoCart , removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;