import axios from "axios";
import {baseUrl} from "./BaseUrl";

export const is_auth = () => {
    return !!localStorage.getItem('token');
}


export const register = (name, age, password) => {
    console.log("yeees")
    const data = {
        name: name,
        age: age,
        password: password
    };

    axios.post(`${baseUrl}/auth/register`, data)
        .then(response => {
            // localStorage.setItem('token', response.data.token)
            // window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
}

export const login = (name, password) => {

    const data = {
        name: name,
        password: password
    };

    axios.post(`${baseUrl}/auth/login`, data)
        .then(response => {
            localStorage.setItem('token', response.data.token)
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
}

export const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
}
