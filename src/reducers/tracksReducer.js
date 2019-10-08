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
          all: [...state.all, action.value.track]
        }
    case TYPES.REMOVE_TRACK:
        return {
          ...state,
          all: state.all.filter(t => t.id() !== action.trackId)
        }
    case TYPES.SOLO_TRACK:
        console.log('tracksReducer SOLO_TRACK', action.value)
        return {
          ...state,
          soloed: [...state.soloed, action.value]
        }
    case TYPES.UNSOLO_TRACK:
        console.log('tracksReducer UNSOLO_TRACK', action.value)
        return {
          ...state,
          soloed: state.soloed.filter(t => t.id() !== action.value)
        }
    case TYPES.TOGGLE_SOLO_TRACK:
        console.log('tracksReducer TOGGLE_SOLO_TRACK', action.value)
        return {
          ...state
        }
    case TYPES.MUTE_TRACK:
        console.log('tracksReducer MUTE_TRACK', action.value)
        return {
          ...state,
          muted: [...state.muted, action.value]
        }
    case TYPES.UNMUTE_TRACK:
        console.log('tracksReducer UNMUTE_TRACK', action.value)
        return {
          ...state,
          muted: state.muted.filter(t => t.id() !== action.value)
        }
    // case TYPES.TRIGGERING:
    //     // console.log('tracksReducer TRIGGERING', action.value)
    //     return {
    //       ...state,
    //       trigger: state.all.filter(t => t.id() === action.trackId)
    //     }
    default:
        return state
  } 
}
