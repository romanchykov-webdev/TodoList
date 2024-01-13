import {API_URL} from "../config";
import axios from "axios";
import {getTodosAction} from "../reducers/getSliceReducer";

export function getTodos() {

    return async dispatch => {
        try {
            // debugger
            // const response = await axios.get(API_URL,{params:{_page:0,_limit: 1000}})
            const response = await axios.get('http://localhost:5000/boards',{params:{_page:0,_limit: 1000}})
                // , { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})

            dispatch(getTodosAction(response.data))
            console.log('getTodos')
        } catch (e) {
            alert(e.response.data.message)
        }

    }

}

export function postTodos(newItem) {

    return async dispatch => {
        try {
            // debugger
            // const response = await axios.get(API_URL,{params:{_page:0,_limit: 1000}})
            const response = await axios.post(API_URL,
                {...newItem}
            )
            // , { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            dispatch(getTodos())
            // debugger
            // dispatch(getTodosAction(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }

    }

}