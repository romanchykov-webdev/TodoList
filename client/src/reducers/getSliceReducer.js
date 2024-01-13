import {createSlice} from "@reduxjs/toolkit";


const getSliceReducer=createSlice({
    name:'get',
    initialState:{
        getTodos:[]
    },
    reducers:{
        getTodosAction(state,action){
            const todos=action.payload
            // debugger
            state.getTodos=todos
        }
    }
})

export default getSliceReducer.reducer
export const {
    getTodosAction,
}=getSliceReducer.actions