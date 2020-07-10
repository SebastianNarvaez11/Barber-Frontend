import { FETCH_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from '../actions/UserActions'

const initialState = {
    users: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_USERS:
            return {
                ...state,
                users: action.payload.users
            }

        case CREATE_USER:
            return {
                ...state,
                users: [action.payload.user, ...state.users]
            }

        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.user.id ? (user = action.payload.user) : user),
            }

        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload.user.id)
            }

        default:
            return state
    }
}

export default userReducer