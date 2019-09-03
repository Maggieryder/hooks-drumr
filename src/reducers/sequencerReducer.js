import * as TYPES from '../actions'
import sequenceReducer from './sequenceReducer'

const initialState = {
  isPlaying: false,
  tempo: 96,
  swing: 0,
  numBars: 1,
  numBeats: 4,
  numSteps: 16,
  sequences: [],
  currentBar: 0,
  currentStep: 0
}



export default function(state = initialState, action) {
  // console.log('sequencerReducer action', action)
  switch (action.type){
    case TYPES.ADD_SEQUENCE: 
        return {
          ...state,
          sequences: [...state.sequences, sequenceReducer(undefined, action)]
        }
    case TYPES.REMOVE_SEQUENCE:
        return {
          ...state,
          sequences: state.sequences.filter(s => s.id !== action.trackId)
        }
    case TYPES.IS_PLAYING:
        console.log('sequencerReducer IS_PLAYING', action.value)
        return {
          ...state,
          // currentBar: 0,
          // currentStep: 0,
          isPlaying: !state.isPlaying
        }
    case TYPES.UPDATE_SEQUENCES:
        return {
          ...state,
          // currentBar: action.value.barId,
          // currentStep: action.value.stepId,
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
    case TYPES.ADD_BAR:
        return {
            ...state,
            numBars: state.numBars + 1,
            sequences: state.sequences.map(t => sequenceReducer(t, action))
        }
    case TYPES.REMOVE_BAR:
        return {
            ...state,
            numBars: state.numBars - 1,
            currentBar: state.numBars - 2,
            sequences: state.sequences.map(t => sequenceReducer(t, action))
        }
    case TYPES.UPDATE_CURRENT_BAR:
        return {
            ...state,
            // currentStep: 0,
            currentBar: action.value
        }
    case TYPES.UPDATE_CURRENT_STEP:
        return {
            ...state,
            currentStep: action.value
        }
    case TYPES.UPDATE_NUMSTEPS:
        return {
          ...state,
          numSteps: action.value.numSteps,
          numBeats: action.value.numSteps === 12 ? 3 : 4,
          sequences: state.sequences.map(t => sequenceReducer(t, action))
        }
    default:
        return state
  } 
}
