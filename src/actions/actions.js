import * as TYPES from '../actions'

export const togglePlay = ( bool ) => ({
  type: TYPES.IS_PLAYING,
  value: bool
})

export const updateSequences = ( arr ) => ({
  type: TYPES.UPDATE_SEQUENCES,
  value: arr
})

export const updateTempo = ( num ) => ({
  type: TYPES.UPDATE_TEMPO,
  value: num
})

export const updateSwing = ( num ) => ({
  type: TYPES.UPDATE_SWING,
  value: num
})

export const updateNumSteps = ( num ) => ({
  type: TYPES.UPDATE_NUMSTEPS,
  value: num
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

export const isLoading = ( bool ) => ({
  type: TYPES.IS_LOADING,
  value: bool
})

export const hasError = ( err ) => ({
  type: TYPES.HAS_ERROR,
  value: err
})