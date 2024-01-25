import {createSlice} from "@reduxjs/toolkit";


const userSliceReducer=createSlice({
    name:"userSliceReducer",
    initialState:{
        currentUser:{},
        isAuth:false,
        isVisible:false
    },
    reducers:{
        toggleIsVisiblePassword(state){
            state.isVisible=!state.isVisible
        }
    }
})

export default userSliceReducer.reducer
export const {
    toggleIsVisiblePassword,
}=userSliceReducer.actions