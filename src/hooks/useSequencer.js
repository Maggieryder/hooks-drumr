import { useState, useEffect, useContext, useCallback } from 'react'
import { DrumrContext } from '../context/DrumrContext'

import * as TYPES from '../actions/types'

import { AUDIO_CONTEXT, SEQUENCER } from '../api'

SEQUENCER.init()

const useSequencer = () => {

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

  // const [bar, setBar] = useState([])

  // useEffect(() => {
  //   console.log('[useSequencer] sequence update', sequences)
  // }, [sequences, numSteps, numBars])

  // useEffect(() => {
  //   setBar(Array.apply(null, {length: numSteps}).map(() => 0))
  //   // console.log('[useSequencer] numSteps update', numSteps)
  // }, [numSteps])

  useEffect(() => {
    console.log('[useSequencer] INIT')
    SEQUENCER.init(dispatch)
  }, [])

  useEffect(()=> {
    SEQUENCER.updateTracks(all)
  }, [all])

  // const setSequences = ({ trackId, barId, stepId }) => {
  //   console.log('[useTrack] setSequence', { trackId, barId, stepId })
  //   // sequences[trackId][barId][stepId]
  //   // setState(state => ({ 
  //   //   ...state, 
  //   //   sequence: value 
  //   // }));
  //   dispatch({ type: TYPES.UPDATE_SEQUENCES, value: { trackId, trackId, barId, stepId } })
  // }

  const onNoteTap = useCallback(
    (trackId, barId, stepId, isOn) => {
      console.log('NOTE TAP trackIndex', trackId, 'bar', barId, 'step', stepId, 'isOn', isOn);
      const track = tracks.all[trackId]      
      if (!isPlaying){
        track.triggerSample(AUDIO_CONTEXT.currentTime);
      }
      dispatch({ type: TYPES.UPDATE_SEQUENCES, value: { trackId, barId, stepId, isOn } })
    },
    [isPlaying],
  )

  const togglePlay = useCallback(
    () => {
      // console.log('togglePlay', isPlaying)
      SEQUENCER.togglePlay(!isPlaying)
      dispatch({ type: TYPES.IS_PLAYING })
    },
    [isPlaying],
  )

  const setTempo = useCallback(
    value => {
    // console.log('setTempo', value)
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

  const addBar = useCallback(
    () => {
      SEQUENCER.updateNumBars( numBars + 1 )
      dispatch({ type: TYPES.ADD_BAR, value: { numSteps } })
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
      console.log('updateNumSteps', value)
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
    addBar,
    removeBar,
    onNoteTap,
    updateCurrentBar
  }
}

export default useSequencer;