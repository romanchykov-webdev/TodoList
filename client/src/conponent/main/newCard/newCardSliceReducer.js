import {createSlice} from "@reduxjs/toolkit";



const newCardSliceReducer = createSlice({
    name: "newCard",
    initialState: {
        isActive: false,
        isTextarea: true,
        isList: true,
        isFavorite: false,
        listTemp: [
            {
                id: '12323',
                title: 'Complited',
                completed: true,
            }
        ],
        textareaTemp:[]

    },
    reducers: {
        newCardShowAction(state) {
            state.isActive = true;
            state.isList = false;

        },
        newCardHiddenAction(state) {
            state.isActive = false;
            state.isTextarea = true;
            state.isList = true;

        },
        textareaAction(state) {
            state.isActive = true;
            state.isTextarea = true;
            // state.isList= false;
        },
        listAction(state) {
            state.isActive = true;
            state.isTextarea = false;
            state.isList = false;

        },
        listTempPushAction(state, action) {
            const {newItem} = action.payload
            // debugger
            state.listTemp.push(newItem)
        },
        textareaTempPushAction(state,action){
            const {newItem} = action.payload
            state.textareaTemp.push(newItem)
        },
        listToggleCompletedAction(state, action) {
            const id = action.payload;
            // const updateList = state.listTemp.map(item =>
            //     item.id === id
            //         ? {...item, completed: !item.completed}
            //         : item
            // );
            // state.listTemp=updateList

            const itemToToggle = state.listTemp.find(item => item.id === id);

            if (itemToToggle) {
                itemToToggle.completed = !itemToToggle.completed;
            }
        },
        removeListTempItemAction(state,action){
            const id = action.payload
            // const removeItem=state.listTemp.filter(item=>item.id !== id)
            // state.listTemp=removeItem

            state.listTemp=state.listTemp.filter(item=>item.id!==id)
        },
        isFavoriteToggleAction(state,action){
            const id = action.payload
            state.isFavorite= !state.isFavorite
        },

        createNewCardAction(state,action){

        },


    }
})

export default newCardSliceReducer.reducer
export const {
    newCardShowAction,
    newCardHiddenAction,
    textareaAction,
    listAction,
    listTempPushAction,
    textareaTempPushAction,
    listToggleCompletedAction,
    removeListTempItemAction,
    isFavoriteToggleAction,
} = newCardSliceReducer.actions
