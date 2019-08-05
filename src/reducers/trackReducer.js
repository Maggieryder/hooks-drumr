import * as TYPES from '../actions'

export const initialState = {
  context: null,
  voiceId: -1, 
  gain: 0,
  pan: 0,
  reverbSend: 0,
  delaySend: 0,
  solo: false, 
  mute: false, 
  sequence: []
}

export default function(state = initialState, action) {
  console.log('trackReducer action', action)
  switch (action.type){
    case TYPES.SOLO_TRACK:
        return {
          ...state,
          solo: action.value
        }
    case TYPES.MUTE_TRACK:
        return {
          ...state,
          mute: action.value
        }
    default:
        return state
  } 
}