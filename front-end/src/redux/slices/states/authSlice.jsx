import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    userInfo: null,
    items: []
}


const authSlice = createSlice({
    name: 'userCred',

    initialState,

    reducers : {
        setUserInfo: (state , action) => {
            state.userInfo = action.payload;
        },

        addToCartState : (state, action) => {
            if(state.userInfo) {
                const {_id , bookName , bookInfo, price, author, image} = action.payload;

                const existingItem = state.items?.find((item) => item?._id === _id);
                if(!existingItem) {
                    state.items?.push({_id , bookName, bookInfo, author, price , image});
                }
            }
        },

        deleteCartItem: (state , action) => {
            const itemId = action.payload;
            state.items = state.items?.filter((item) => item._id !== itemId);
        },

        removeInfo: (state ) => {
            localStorage.removeItem('userrToken');
            state.userInfo = null;
            state.items = [];
        }
    }
});

export const {setUserInfo , removeInfo , addToCartState , deleteCartItem} = authSlice.actions;
export default authSlice.reducer;