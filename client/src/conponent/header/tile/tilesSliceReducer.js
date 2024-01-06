import {createSlice} from "@reduxjs/toolkit";


const tilesSliceReducer = createSlice({
    name: "tiles",
    initialState: {
        toggleTiles: 'list'
    },
    reducers: {
        tilesToggleAction(state, action) {
            const {toggle} = action.payload
            // debugger
            state.toggleTiles = toggle
        }
    }
})

export default tilesSliceReducer.reducer;
export const {
    tilesToggleAction,
} = tilesSliceReducer.actions