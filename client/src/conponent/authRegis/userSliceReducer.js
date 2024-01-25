import {createSlice} from "@reduxjs/toolkit";


const userSliceReducer=createSlice({
    name:"userSliceReducer",
    initialState:{
        currentUser:{},
        isAuth:false
    },
    reducers:{

    }
})

export default userSliceReducer.reducer
export const {}=userSliceReducer.actions