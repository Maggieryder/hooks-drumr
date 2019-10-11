import { useContext, useCallback } from 'react'
import { DrumrContext } from '../context/DrumrContext'

import * as TYPES from '../actions/types'

import { AUDIO_CONTEXT, SEQUENCER } from '../api'

import useTrack from './useTrack'

const useSequencer = () => {

  const { triggerPlay } = useTrack()

  const {state:{ sequencer, tracks }, dispatch} = useContext(DrumrContext)

  const { all } = tracks

  const { 
    isPlaying,
    tempo,
    swing,
    numBars,
    numSteps,
    numBeats,
    sequences,
    currentBar,
    currentStep
     } = sequencer

  const onNoteTap = useCallback(
    (trackId, barId, stepId, isOn) => {
      console.log('NOTE TAP trackIndex', trackId, 'bar', barId, 'step', stepId, 'isOn', isOn);
      const track = all[trackId]      
      if (!isPlaying){
        dispatch({ type: TYPES.UPDATE_CURRENT_BAR, value: barId })
        dispatch({ type: TYPES.UPDATE_CURRENT_STEP, value: stepId })
        // if (AUDIO_CONTEXT.state === 'suspended') {
        //   AUDIO_CONTEXT.resume()
        //   setTimeout(()=> AUDIO_CONTEXT.suspend(), 150)
        // }
        triggerPlay({trackId: trackId, value: true})
        //dispatch({type: TYPES.TRIGGERING, {trackId: trackId, value: true}})
        track.triggerSample(AUDIO_CONTEXT.currentTime)
      }
      dispatch({ type: TYPES.UPDATE_SEQUENCES, value: { trackId, barId, stepId, isOn } })
    },
    [isPlaying, all],
  )

  const togglePlay = useCallback(
    () => {
      // console.log('togglePlay', isPlaying)
      // dispatch({ type: TYPES.UPDATE_CURRENT_STEP, value: 0 })
      // if (!isPlaying){
      //   dispatch({ type: TYPES.UPDATE_CURRENT_BAR, value: 0 })
      // }
      SEQUENCER.togglePlay(!isPlaying)
      dispatch({ type: TYPES.IS_PLAYING })
    },
    [isPlaying],
  )

  const setTempo = useCallback(
    value => {
    console.log('setTempo', value)
    SEQUENCER.updateTempo(value)
    dispatch({ type: TYPES.UPDATE_TEMPO, value })
    },
    [],
  )

  const setSwing = useCallback(
    value => {
    // console.log('setSwing', value)
    SEQUENCER.updateSwing(value)
    dispatch({ type: TYPES.UPDATE_SWING, value })
    },
    [],
  )

  const addBars = useCallback(
    () => {
      SEQUENCER.updateNumBars( numBars + 2 )
      dispatch({ type: TYPES.ADD_BARS, value: { numSteps } })
    },
    [numBars, numSteps],
  )

  const removeBar = useCallback(
    () => {
      if (numBars > 1) {
        SEQUENCER.updateNumBars( numBars - 1 )
        dispatch({ type: TYPES.REMOVE_BAR })
      }
    },
    [numBars],
  )

  const setNumSteps = useCallback(
    value => {
      // console.log('updateNumSteps', value)
      SEQUENCER.updateNumSteps( value )
      dispatch({ type: TYPES.UPDATE_NUMSTEPS, value: { numSteps: Number(value), numBars } })
    },
    [numBars],
  )

  const updateCurrentBar = useCallback(
    value => { 
      if (!isPlaying) {
        SEQUENCER.updateCurrentBar(value)  
        dispatch({ type: TYPES.UPDATE_CURRENT_BAR, value })
      } 
    },
    [isPlaying],
  )

  return {
    dispatch,
    isPlaying,
    tempo,
    swing,
    numBars,
    numSteps,
    numBeats,
    setTempo,
    setSwing,
    setNumSteps,
    sequences,
    currentBar,
    currentStep,
    togglePlay,
    addBars,
    removeBar,
    onNoteTap,
    updateCurrentBar
  }
}

export default useSequencer