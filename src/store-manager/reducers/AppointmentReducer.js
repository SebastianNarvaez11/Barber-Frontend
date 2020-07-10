import { TOGGLE_MODAL, ADD_PRODUCT, REMOVE_PRODUCT, CLEAR_PRODUCTS, FETCH_MY_APPOINTMENTS, FETCH_APPOINTMENTS, UPDATE_APPOINTMENT } from '../actions/AppointmentActions'

const initialState = {
  show_modal: false,
  main_product: {},
  products: [],
  my_appointments: [],
  appointments: []
}

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {

    case TOGGLE_MODAL:
      return {
        ...state,
        show_modal: action.show,
        main_product: action.product
      }

    case ADD_PRODUCT:
      let newindex = state.products.findIndex((item) => item.id === action.product.id)
      if (newindex === -1) {
        return {
          ...state,
          products: [...state.products, action.product]
        }
      }

      return state;

    case REMOVE_PRODUCT:
      let newProducts = [...state.products];
      let index = newProducts.findIndex((item) => item.id === action.product.id)
      if (index !== -1) {
        newProducts.splice(index, 1)
      }
      return {
        ...state,
        products: newProducts
      }

    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: []
      }

    case FETCH_MY_APPOINTMENTS:
      return {
        ...state,
        my_appointments: action.my_appointments
      }


    case FETCH_APPOINTMENTS:
      return {
        ...state,
        appointments: action.appointments
      }

    case UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.map(item => item.id === action.appointment.id ? (item = action.appointment) : item),
      }


    default:
      return state
  }
}

export default appointmentReducer
