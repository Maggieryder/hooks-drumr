import * as TYPES from '../actions'

export const updateTempo = ( num ) => ({
  type: TYPES.UPDATE_TEMPO,
  value: num
})

export const updateSwing = ( num ) => ({
  type: TYPES.UPDATE_SWING,
  value: num
})

export const updateNumBars = ( num ) => ({
  type: TYPES.UPDATE_NUMBARS,
  value: num
})

export const updateNumBeats = ( num ) => ({
  type: TYPES.UPDATE_NUMBEATS,
  value: num
})

export const updateNumSteps = ( num ) => ({
  type: TYPES.UPDATE_NUMSTEPS,
  value: num
})

export const updateSignature = ( arr ) => ({
  type: TYPES.UPDATE_NUMSTEPS,
  value: arr
})

export const dataLoaded = ( data ) => ({
  type: TYPES.DATA_LOADED,
  value: data
})

export const updateKitId = ( id ) => ({
  type: TYPES.UPDATE_KIT_ID,
  value: id
})

export const updateVerbId = ( id ) => ({
  type: TYPES.UPDATE_VERB_ID,
  value: id
})

export const updateKitBuffers = ( buffers ) => ({
  type: TYPES.UPDATE_KIT_BUFFERS,
  value: buffers
})

export const updateVerbBuffers = ( buffers ) => ({
  type: TYPES.UPDATE_VERB_BUFFERS,
  value: buffers
})

export const togglePlay = ( ) => ({
  type: TYPES.IS_PLAYING
})

export const isLoading = ( bool ) => ({
  type: TYPES.IS_LOADING
})

export const hasError = ( bool ) => ({
  type: TYPES.HAS_ERROR
})