import { getConfig } from "../../config";
import axios from 'axios'
import { toast } from 'react-toastify';

export const FETCH_USERS = 'FETCH_USERS'
export const CREATE_USER = 'CREATE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

let config = getConfig()
let apiURL = config.apiURL

export const fetchUsers = () => async (dispatch) => {

    let url = `${apiURL}/api/v1/user/`
    await axios.get(url)
        .then(response => {
            dispatch({
                type: FETCH_USERS,
                payload: {
                    users: response.data.results
                }
            })
        })
        .catch(error => {
            toast.error(`${Object.values(error.response.data)[0]}`)
        })
}

export const createUser = (user, handleChangeModal) => async (dispatch) => {

    let url = `${apiURL}/api/v1/user/`
    await axios.post(url, user)
        .then(response => {
            dispatch({
                type: CREATE_USER,
                payload: {
                    user: response.data
                }
            })
            toast.success("Usuario creado correctamente");
            handleChangeModal()
        })
        .catch(error => {
            toast.error(`${Object.values(error.response.data)[0]}`)
        })
}

export const updateUser = (user, handleChangeModal) => async (dispatch) => {

    let url = `${apiURL}/api/v1/user/${user.id}/`
    await axios.put(url, user)
        .then(response => {
            dispatch({
                type: UPDATE_USER,
                payload: {
                    user: response.data
                }
            })
            toast.success("Usuario actualizado correctamente");
            handleChangeModal()
        })
        .catch(error => {
            toast.error(`${Object.values(error.response.data)[0]}`)
        })
}

export const deleteUser = (user) => async (dispatch) => {

    let url = `${apiURL}/api/v1/user/${user.id}/`

    await axios.put(url, user)
        .then(response => {
            dispatch({
                type: DELETE_USER,
                payload: {
                    user: response.data
                }
            })
            toast.success("Usuario eliminado correctamente");
        })
        .catch(error => {
            toast.error(`${Object.values(error.response.data)[0]}`)
        })
}