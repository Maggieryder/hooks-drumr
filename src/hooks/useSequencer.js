import { useState, useEffect, useContext, useCallback } from 'react'
import { DrumrContext } from '../context/DrumrContext'

import * as TYPES from '../actions/types'

import { AUDIO_CONTEXT, SEQUENCER } from '../api'

SEQUENCER.init()

const useSequencer = () => {

  const {state:{ sequencer, tracks }, dispatch} = useContext(DrumrContext)

  const { 
    isPlaying,
    tempo,
    swing,
    signature,
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

  // useEffect(() => {
  //   // console.log('[useSequencer] bar update', bar)
  // }, [bar])

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
      // console.log('Sequencer.running', Sequencer.running());
      if (!isPlaying){
        track.triggerSample(AUDIO_CONTEXT.currentTime);
      //   SEQUENCER.sequenceNote(trackId, barId, stepId);
      }
      dispatch({ type: TYPES.UPDATE_SEQUENCES, value: { trackId, barId, stepId, isOn } })
    },
    [],
  )

  const updateCurrentBar = useCallback(
    value => {   
      dispatch({ type: TYPES.UPDATE_CURRENT_BAR, value })
    },
    [],
  )

  const togglePlay = useCallback(
    () => {
      // console.log('togglePlay', isPlaying)
      SEQUENCER.togglePlay()
      dispatch({ type: TYPES.IS_PLAYING })
    },
    [],
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
    SEQUENCER.updateSwingFactor(value)
    dispatch({ type: TYPES.UPDATE_SWING, value })
    },
    [],
  )

  const addBar = useCallback(
    () => {
      dispatch({ type: TYPES.ADD_BAR, value: { numSteps } })
    },
    [numSteps],
  )

  const removeBar = useCallback(
    () => {
      if (numBars > 1) {
        dispatch({ type: TYPES.REMOVE_BAR })
      }
    },
    [numBars],
  )

  const setNumBars = useCallback(
    value => {
      // console.log('setNumBars', value)
      dispatch({ type: TYPES.UPDATE_NUMBARS, value: { numSteps, numBars: Number(value) } })
    },
    [numSteps],
  )

  const setNumBeats = useCallback(
    value => {
      // console.log('setNumBars', value)
      dispatch({ type: TYPES.UPDATE_NUMBEATS, value })
    },
    [],
  )

  const setNumSteps = useCallback(
    value => {
      console.log('setNumSteps', value)
      dispatch({ type: TYPES.UPDATE_NUMSTEPS, value: { numSteps: Number(value), numBars } })
    },
    [numBars],
  )

  const setSignature = useCallback(
    value => {
      // console.log('setSignature', value)
      dispatch({ type: TYPES.UPDATE_SIGNATURE, value })
    },
    [],
  )

  return {
    isPlaying,
    tempo,
    swing,
    signature,
    numBars,
    numSteps,
    numBeats,
    setTempo,
    setSwing,
    setSignature,
    setNumBars,
    setNumBeats,
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