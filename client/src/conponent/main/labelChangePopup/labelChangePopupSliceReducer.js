import {createSlice} from "@reduxjs/toolkit";


const labelChangePopupSliceReducer = createSlice({
    name: "labelChangePopup",
    initialState: {
        isActive: false
    }, reducers: {
        labelTogglePopupAction(state) {
            state.isActive = !state.isActive
        }
    }
})

export default labelChangePopupSliceReducer.reducer
export const {
    labelTogglePopupAction,
} = labelChangePopupSliceReducer.actions