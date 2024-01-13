import {createSlice} from "@reduxjs/toolkit";


const labelChangePopupSliceReducer = createSlice({
    name: "labelChangePopup",
    initialState: {
        isActive: false
    }, reducers: {
        labelChangePopupAction(state, action={}) {
            const id = action.payload
            // debugger
            state.isActive = !state.isActive
        }
    }
})

export default labelChangePopupSliceReducer.reducer
export const {
    labelChangePopupAction,
} = labelChangePopupSliceReducer.actions