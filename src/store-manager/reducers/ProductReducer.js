import { FETCH_PRODUCTS, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actions/ProductActions'

const initialState = {
    products: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload.products
            }

        case CREATE_PRODUCT:
            return {
                ...state,
                products: [action.payload.product, ...state.products]
            }

        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(product => product.id === action.payload.product.id ? (product = action.payload.product) : product),
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload.product.id)
            }

        default:
            return state
    }
}

export default productReducer
