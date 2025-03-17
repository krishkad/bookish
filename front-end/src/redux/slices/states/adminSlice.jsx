import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    adminData: null
}


const authSlice = createSlice({
    name: 'adminCred',

    initialState,

    reducers : {
        setadminInfo: (state , action) => {
            state.adminData = action.payload;
        },

        deleteAdminInfo: (state ) => {
            localStorage.removeItem('adminToken');
            state.adminData = null;
        }
    }
});

export const {setadminInfo , deleteAdminInfo} = authSlice.actions;
export default authSlice.reducer;