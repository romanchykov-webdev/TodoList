import {createSlice} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {putTodos} from "../actions/todos";


const getSliceReducer = createSlice({
    name: 'get',
    initialState: {
        colorsPalette:[],
        getTodos: []
    },
    reducers: {
        getTodosAction(state, action) {
            const todos = action.payload
            // debugger
            state.getTodos = todos
        },
        getColorsPaletteAction(state, action) {
            const colors = action.payload
            // debugger
            state.colorsPalette = colors
        },
        changeColorBackgroundAction(state,action){
          const {id, color}=action.payload
            state.getTodos=state.getTodos.map(item=>{
                if(item.id===id){
                    item.color=color
                }
                return item
            })
        },
        favoriteToggleAction(state, action) {
            const id = action.payload

            state.getTodos = state.getTodos.map(item => {
                if (item.id === id) {
                    item.isFavorite = !item.isFavorite
                }

                return item
            })

        },
        bookmarkAddAction(state, action) {
            const {id, label} = action.payload
            // debugger
            state.getTodos = state.getTodos.map(item => {
                if (item.id === id) {
                    if (!item.label.includes(label)) {
                        // Add the label if it doesn't exist
                        item.label = [...item.label, label];

                    }
                }
                return item
            })
        },
        bookmarkRemoveAction(state, action) {
            const { id, label } = action.payload;
            // debugger
            state.getTodos = state.getTodos.map(item => {
                if (item.id === id) {
                    item.label = item.label.filter(itemLabel => itemLabel !== label);
                }
                return item; // Return the updated item
            });
        }

    }
})

export default getSliceReducer.reducer
export const {
    getTodosAction,
    getColorsPaletteAction,
    changeColorBackgroundAction,
    favoriteToggleAction,
    bookmarkAddAction,
    bookmarkRemoveAction,
} = getSliceReducer.actions