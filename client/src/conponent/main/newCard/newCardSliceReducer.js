import {createSlice} from "@reduxjs/toolkit";


const newCardSliceReducer=createSlice({
    name:"newCard",
    initialState:{
        isActive: false,
        isTextarea:true,
        isList:true,

    },
    reducers:{
        newCardShowAction(state){
            state.isActive= true;
            state.isList= false;

        },
        newCardHiddenAction(state){
            state.isActive=false;
            state.isTextarea= true;
            state.isList= true;

        },
        textareaAction(state){
            state.isActive= true;
            state.isTextarea= true;
            // state.isList= false;
        },
        listAction(state){
            state.isActive= true;
            state.isTextarea= false;
            state.isList= false;

        }
    }
})

export default newCardSliceReducer.reducer
export const {
    newCardShowAction,
    newCardHiddenAction,
    textareaAction,
    listAction,
}=newCardSliceReducer.actions
