import {combineReducers, configureStore} from "@reduxjs/toolkit";
import burgerSliceReducer from "../conponent/header/burger/burgerSliceReducer";
import searchSliceReducer from "../conponent/header/search/icons/searchSliceReducer";
import tilesSliceReducer from "../conponent/header/tile/tilesSliceReducer";
import newCardSliceReducer from "../conponent/main/newCard/newCardSliceReducer";


const rootReducer=combineReducers({
    burgerSlice:burgerSliceReducer,
    searchSlice: searchSliceReducer,
    tilesSlice:tilesSliceReducer,
    newCardSlice: newCardSliceReducer
})

export const store=configureStore({
    reducer: rootReducer
})