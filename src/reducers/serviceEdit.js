import {
    EDIT_SERVICE_FIELD, GET_SERVICE_REQUEST, GET_SERVICE_FAILURE, GET_SERVICE_SUCCESS, EDIT_SERVICE_REQUEST, EDIT_SERVICE_FAILURE, EDIT_SERVICE_SUCCESS
} from '../actions/actionTypes'

const initialState = {
    item: {
        name: '',
        price: '',
        content: '',
    },
    loading: false,
    error: null,
}

export default function serviceEditReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SERVICE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_SERVICE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case GET_SERVICE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
                error: null,
            }
        case EDIT_SERVICE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case EDIT_SERVICE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        case EDIT_SERVICE_SUCCESS:
            return {
                ...initialState
            }
        case EDIT_SERVICE_FIELD:
            const { name, value } = action.payload;
            const { item } = state;
            return {
                ...state,
                item: {
                    ...item,
                    [name]: value,
                }
            };
        default:
            return state
    }
}