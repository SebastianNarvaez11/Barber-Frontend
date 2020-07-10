import axios from 'axios'
import { getConfig } from '../../config'
import { toast } from 'react-toastify';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const DELETE_PHOTO = 'DELETE_PHOTO'
let config = getConfig()
let apiURL = config.apiURL

export const fetchProducts = () => async (dispatch) => {
    
    let url = `${apiURL}/api/v1/product/list/`

    await axios.get(url)
        .then(response => {
            dispatch({
                type: FETCH_PRODUCTS,
                payload: {
                    products: response.data
                }
            })
        })
        .catch(error => {
            try {
                toast.error(`${Object.values(error.response.data)[0]}`)
            } catch (error) {
                console.log("e", error);
            }
        })
}




export const createProduct = (formData, toggleModal, files) => async (dispatch) => {

    let url = `${apiURL}/api/v1/product/`

    await axios.post(url, formData, { headers: { 'content-type': 'multipart/form-data' } })
        .then(response => {
            dispatch({
                type: CREATE_PRODUCT,
                payload: {
                    product: response.data,
                    photos: files
                }
            })
            toast.success("Servicio creado correctamente");
            toggleModal()
        })
        .catch(error => {
            if (error.response && error.response.data && Object.values(error.response.data).length > 0){
                toast.error(`${Object.values(error.response.data)[0]}`)
            }else{
                toast.error("Ocurrió un error al crear el servicio")
            }
            
        })
}



export const updateProduct = (formData, id, extra, handleChangeModal) => async (dispatch) => {

    let url = `${apiURL}/api/v1/product/${id}/`

    await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data' } })
        .then(response => {
            dispatch({
                type: UPDATE_PRODUCT,
                payload: {
                    product: response.data,
                    extra: extra
                }
            })
            toast.success("Servicio actualizado correctamente");
            // eslint-disable-next-line no-lone-blocks
            {handleChangeModal && handleChangeModal()}
        })
        .catch(error => {
            toast.error(`${Object.values(error.response.data)[0]}`)
        })
}


export const deleteProduct = (formData, id) => async (dispatch) => {

    let url = `${apiURL}/api/v1/product/${id}/`

    await axios.delete(url, formData, { headers: { 'content-type': 'multipart/form-data' } })
        .then(response => {
            dispatch({
                type: DELETE_PRODUCT,
                payload: {
                    product: {id}
                }
            })
            toast.success("Servicio eliminado correctamente");
        })
        .catch(error => {
            toast.error(`${Object.values(error.response.data)[0]}`)
        })
}
