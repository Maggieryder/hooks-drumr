import * as TYPES from '../actions'

const initialState = {
  isLoading: false,
  hasError: null,
  kits: null,
  verbs: null,
  kitBuffers: [{ label: '...', value: '0'}],
  verbBuffers: [{ label: '...', value: '0'}],
  currentKitId: 1,
  currentVerbId: 0,
}
export default function(state = initialState, action) {
    // console.log('controllerReducer action', action)
    switch (action.type){
        
        case TYPES.UPDATE_KIT_ID:
            return {
              ...state,
              currentKitId: action.value
            }
        case TYPES.UPDATE_VERB_ID:
            return {
              ...state,
              currentVerbId: action.value,
            }
        case TYPES.UPDATE_KIT_BUFFERS:
            return {
              ...state,
              kitBuffers: action.value,
              isLoading: false
            }
        case TYPES.UPDATE_VERB_BUFFERS:
            return {
              ...state,
              verbBuffers: action.value,
              isLoading: false
            }
        case TYPES.IS_LOADING:
            return {
              ...state,
              isLoading: action.value
            }
        case TYPES.DATA_LOADED:
            return {
              ...state,
              kits: action.value.kits,
              verbs: action.value.verbs,
              isLoading: false
            }
        case TYPES.HAS_ERROR:
            return {
              ...state,
              hasError: action.value,
              isLoading: false
            }
        default:
            return state
    } 
}
