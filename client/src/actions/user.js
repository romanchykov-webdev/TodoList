import axios from "axios";
import {API_URLMongo} from "../config";
import {isAuthUserAction} from "../conponent/authRegis/userSliceReducer";
import {getColorsPaletteAction, getTodosAction} from "../reducers/getSliceReducer";
import {getTodos} from "./todos";

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

            const response =await axios.get(`${API_URLMongo}auth/auth`, {
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(isAuthUserAction(response.data.user))
            dispatch(getTodosAction(response.data.user.todos))
            dispatch(getColorsPaletteAction(response.data.user.colorsPalette))
            localStorage.setItem('token',response.data.token)

            console.log(response.data)

        } catch (e) {
            alert(e.response.data.message)
            // localStorage.removeItem('token')
        }
    }

}



// Добавление todo
export const addTodo = (newTodo) => {
    // debugger
    return async (dispatch) => {
        try {
            // Посылаем POST запрос на сервер, чтобы добавить новый todo
            const response = await axios.post(
                `${API_URLMongo}auth/add-todo`,
                { newTodo },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // Обновляем состояние приложения, если запрос успешен
            dispatch(auth()); // Передавайте необходимые параметры, если ваш запрос getTodos требует их

            // Выводим сообщение об успешном добавлении
            alert(response.data.message);
        } catch (e) {
            // Выводим ошибку, если запрос не удался
            alert(e.response.data.message);
        }
    };
};


// Добавление PATCH

export const updateTodo = (newTodo) => {
    debugger
    return async (dispatch) => {
        try {
            // Устанавливаем состояние загрузки
            // dispatch(loaderOn);

            // Посылаем POST запрос на сервер, чтобы обновить todo
            const response = await axios.post(
                `${API_URLMongo}auth/update-todo`,
                { ...newTodo },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // Обновляем состояние приложения, если запрос успешен
            dispatch(auth()); // Передавайте необходимые параметры, если ваш запрос auth требует их

            // Выводим сообщение об успешном обновлении
            alert(response.data.message);

            // dispatch(loaderOff);
        } catch (e) {
            // Выводим ошибку, если запрос не удался
            alert(e.response.data);

        }
    };
};
