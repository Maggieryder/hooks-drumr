import * as TYPES from '../actions'

const initialState = {
  isLoading: false,
  hasError: null,
  isPlaying: false,
  kits: null,
  verbs: null,
  kitBuffers: [{ label: '...', value: '0'}],
  verbBuffers: [{ label: '...', value: '0'}],
  currentKitId: 1,
  currentVerbId: 0,
  signature:'4/4',
  tempo: 96,
  swing: 0,
  numBars: 1,
  numBeats: 4,
  numSteps: 16
}
export default function(state = initialState, action) {
    // console.log('controllerReducer action', action)
    switch (action.type){
        case TYPES.UPDATE_TEMPO:
            return {
              ...state,
              tempo: action.value
            }
        case TYPES.UPDATE_SWING:
            return {
              ...state,
              swing: action.value
            }
        case TYPES.UPDATE_NUMBARS:
            return {
              ...state,
              numBars: action.value
            }
        case TYPES.UPDATE_NUMBEATS:
            return {
              ...state,
              numBeats: action.value
            }
        case TYPES.UPDATE_NUMSTEPS:
            return {
              ...state,
              numSteps: action.value
            }
        case TYPES.UPDATE_SIGNATURE:
            return {
              ...state,
              signature: action.value
            }
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
        case TYPES.IS_PLAYING:
            return {
              ...state,
              isPlaying: !state.isPlaying
            }
        default:
            return state
    } 
}
