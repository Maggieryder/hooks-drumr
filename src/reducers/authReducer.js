import * as TYPES from '../actions'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

export default function(state = initialState, action) {
    // console.log('authReducer action', action)
    switch (action.type){ 
        case TYPES.AUTH_START:
            return {
              ...state,
              error: null,
              loading: true
            }
        case TYPES.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            }
        case TYPES.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case TYPES.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }    
        default:
            return state
    } 
}