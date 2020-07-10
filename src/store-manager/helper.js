import Axios from "axios";


export function getToken() {
    return (localStorage.getItem('currentToken') ? JSON.parse(localStorage.getItem('currentToken')).access : undefined);
}

export function deleteToken() {
    localStorage.removeItem('currentToken');
    window.location = "/";
}

//Funcion que pasa el token en todas las solicitudes a la API
export function initAxiosInterceptors() {
    Axios.interceptors.request.use(config => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    Axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401) {
                deleteToken();
                window.location = "/";
            } else {
                return Promise.reject(error);
            }
        }
    );
}