import * as TYPES from '../actions'

export const initialState = {
    all: [],
    soloed: [],
    muted: [],
    // voiceIds: [],
    // volumes: [],
    // pans: [],
    // reverbSends: [],
    // delaySends: []
}
export default function(state = initialState, action) {
  // console.log('tracksReducer action', action)
  switch (action.type){
    case TYPES.ADD_TRACK:
        return {
          ...state,
          all: [...state.all, action.value]
        }
    case TYPES.REMOVE_TRACK:
        return {
          ...state,
          all: state.all.filter(t => t.id !== action.value)
        }
    case TYPES.SOLO_TRACK:
        return {
          ...state,
          soloed: [...state.soloed, action.value]
        }
    case TYPES.UNSOLO_TRACK:
        return {
          ...state,
          soloed: state.soloed.filter(t => t.id !== action.value)
        }
    case TYPES.MUTE_TRACK:
        return {
          ...state,
          muted: [...state.muted, action.value]
        }
    case TYPES.UNSOLO_TRACK:
        return {
          ...state,
          muted: state.muted.filter(t => t.id !== action.value)
        }
    default:
        return state
  } 
}
