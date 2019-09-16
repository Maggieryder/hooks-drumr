import * as TYPES from '../actions'

const initialState = {
  user: null,
  error: null,
  isAuthenticated: false,
  inProgress: false
}

export default function(state = initialState, action) {
    // console.log('authReducer action', action)
    switch (action.type){ 
        case TYPES.AUTH_START:
            return {
              ...state,
              inProgress: true
            }
        case TYPES.AUTH_SUCCESS:
            return {
                ...state,
                user: action.user,
                isAuthenticated: true,
                inProgress: false
            }
        case TYPES.AUTH_FAIL:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                inProgress: false,
                error: action.error
            }   
        default:
            return state
    } 
}