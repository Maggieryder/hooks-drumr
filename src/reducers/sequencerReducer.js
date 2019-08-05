import * as TYPES from '../actions'

const initialState = {
  isPlaying: false,
  signature:'4/4',
  tempo: 96,
  swing: 0,
  numBars: 1,
  numBeats: 4,
  numSteps: 16,
  sequences: []
}

export default function(state = initialState, action) {
  // console.log('tracksReducer action', action)
  switch (action.type){
    case TYPES.IS_PLAYING:
        return {
          ...state,
          isPlaying: !state.isPlaying
        }
    case TYPES.UPDATE_SEQUENCES:
        return {
          ...state,
          sequences: action.value
        }
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
    default:
        return state
  } 
}
