import {createSlice} from "@reduxjs/toolkit";


const newCardSliceReducer = createSlice({
    name: "newCard",
    initialState: {
        id: "new",
        isActive: false,
        isTextarea: true,
        isList: true,
        isFavorite: false,
        listTemp: [],
        textareaTemp: [],
        labelChangePopup: false,
        labels: ["all"]

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
            state.isFavorite = false;
            state.listTemp = []
            state.textareaTemp = []
            state.labels = ["all"]

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
        textareaTempPushAction(state, action) {
            const {newItem} = action.payload
            state.textareaTemp.push(newItem)
        },
        listToggleCompletedAction(state, action) {
            const id = action.payload;
            // debugger
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
        removeListTempItemAction(state, action) {
            const id = action.payload
            // const removeItem=state.listTemp.filter(item=>item.id !== id)
            // state.listTemp=removeItem

            state.listTemp = state.listTemp.filter(item => item.id !== id)
        },
        isFavoriteToggleAction(state, action) {
            const id = action.payload
            state.isFavorite = !state.isFavorite
        },

        createNewCardAction(state) {
            state.listTemp = []
            state.textareaTemp = []
            state.labels = ["all"]
        },
        changeListTempValueAction(state, action) {
            const {id, title} = action.payload
            // debugger
            state.listTemp.map(item => {
                if (item.id === id) {
                    item.title = title
                }
            })
        },
        changeTextareaTempValueAction(state, action) {
            // const {id,title}=action.payload
            // debugger
            state.textareaTemp = action.payload
        },
        labelsAddAction(state, action) {
            const label = action.payload;
            // debugger
            if (!state.labels.includes(label)) {
                // Add the label if it doesn't exist
               state.labels = [...state.labels, label];

            }
        },
        labelsRemoveAction(state, action) {
            const label = action.payload;
            // debugger
            state.labels=state.labels.filter(item=>item!==label)
        }


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
    createNewCardAction,
    changeListTempValueAction,
    changeTextareaTempValueAction,
    labelsAddAction,
    labelsRemoveAction,
} = newCardSliceReducer.actions
