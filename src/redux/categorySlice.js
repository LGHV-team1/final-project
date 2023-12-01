import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name:"category",
    initialState:{
        value:""
    },
    reducers:{
        setCategory: (state, action) => {
            state.value = action.payload
        }
    }


});

export const {setCategory} = categorySlice.actions;

export default categorySlice.reducer

