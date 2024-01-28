import axios from "axios";
import {API_URLMongo} from "../config";
import {isAuthUserAction} from "../conponent/authRegis/userSliceReducer";

// registration
export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${API_URLMongo}auth/registration`, {
            email,
            password
        })
        alert(response.data.message)

    } catch (e) {
        alert(e.response.data.message)
    }
}

//LogIn
export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URLMongo}auth/login`, {
                email,
                password
            })
            dispatch(isAuthUserAction(response.data.user))
            localStorage.setItem('token',response.data.token)
            console.log(response.data)

        } catch (e) {
            alert(e.response.data.message)
        }
    }

}

//isAuth

export const auth = () => {
    return async dispatch => {
        try {
            // const response = await axios.get(`${API_URLMongo}auth/auth`,
            //     {
            //         headers:{Authorization:`Bearer${localStorage.getItem('token')}`}
            //     }
            // )
            // dispatch(isAuthUserAction(response.data.user))
            // localStorage.setItem('token',response.data.token)
            // console.log(response.data)
            const response =await axios.get(`${API_URLMongo}auth/auth`, {
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(isAuthUserAction(response.data.user))
            localStorage.setItem('token',response.data.token)
            console.log(response.data)

        } catch (e) {
            alert(e.response.data.message)
            // localStorage.removeItem('token')
        }
    }

}