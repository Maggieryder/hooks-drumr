import * as TYPES from '../actions'
import sequenceReducer from './sequenceReducer'

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
  console.log('sequencerReducer action', action)
  switch (action.type){
    case TYPES.ADD_TRACK:
        
        return {
          ...state,
          sequences: [...state.sequences, sequenceReducer(undefined, action)]
        }
    case TYPES.REMOVE_TRACK:
        return {
          ...state,
          sequences: state.sequences.filter(t => t !== action.trackId)
        }
    case TYPES.IS_PLAYING:
        return {
          ...state,
          isPlaying: !state.isPlaying
        }
    case TYPES.UPDATE_SEQUENCES:
        return {
          ...state,
          sequences: state.sequences.map(t => sequenceReducer(t, action))
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
