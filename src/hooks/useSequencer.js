import { useState, useEffect, useContext, useCallback } from 'react'
import { DrumrContext } from '../context/DrumrContext'

import * as TYPES from '../actions/types'

import { AUDIO_CONTEXT, SEQUENCER } from '../api'

SEQUENCER.init()

const useSequencer = () => {

  const {state:{ sequencer, tracks }, dispatch} = useContext(DrumrContext);

  const { 
    isPlaying,
    tempo,
    swing,
    signature,
    numBars,
    numSteps,
    numBeats,
    sequences
     } = sequencer

  const [bar, setBar] = useState([])

    useEffect(() => {
      console.log('[useSequencer] sequence update', sequences)
      return (() => {
      })
    }, [sequences])

    useEffect(() => {
      // setBar(Array(numSteps).fill(0))
      setBar(Array.apply(null, {length: numSteps}).map(() => 0))
      // setBar(numSteps === 12 ? [0,0,0,0,0,0,0,0,0,0,0,0] : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
      // console.log('[useSequencer] numSteps update', numSteps)
    }, [numSteps])

    useEffect(() => {
      // console.log('[useSequencer] bar update', bar)
    }, [bar])

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
      console.log('trackIndex', trackId, 'bar', barId, 'step', stepId, 'isOn', isOn);
      const track = tracks.all[trackId]
      // console.log('track', track)
      // console.log('Sequencer.running', Sequencer.running());
      if (!isPlaying){
        track.triggerSample(AUDIO_CONTEXT.currentTime);
      //   SEQUENCER.sequenceNote(trackId, barId, stepId);
      }
      dispatch({ type: TYPES.UPDATE_SEQUENCES, value: { trackId, barId, stepId, isOn } })
    },
    [],
  )
  // (trackId, barId, stepId, isOn) => {
  //   console.log('trackIndex', trackId, 'bar', barId, 'step', stepId, 'isOn', isOn);
  //   const track = tracks.all[trackId]
  //   console.log('track', track)
  //   // console.log('Sequencer.running', Sequencer.running());
  //   if (!isPlaying){
  //     track.triggerSample(AUDIO_CONTEXT.currentTime);
  //   //   SEQUENCER.sequenceNote(trackId, barId, stepId);
  //   }
  //   dispatch({ type: TYPES.UPDATE_SEQUENCES, value: { trackId, barId, stepId, isOn } })  
  // }

  function togglePlay() {
    //   if (state.isPlaying) {
    //     state.audioPlayer.pause();
    //   } else {
    //     state.audioPlayer.play();
    //   }
    //   setState(state => ({ ...state, isPlaying: !state.isPlaying }));
    SEQUENCER.togglePlay()
    dispatch({ type: TYPES.IS_PLAYING })
  }

  const setTempo = value => {
    // console.log('setTempo', value)
    SEQUENCER.updateTempo(value)
    dispatch({ type: TYPES.UPDATE_TEMPO, value })
  }

  const setSwing = value => {
    // console.log('setSwing', value)
    SEQUENCER.updateSwingFactor(value)
    dispatch({ type: TYPES.UPDATE_SWING, value })
  }

  const setNumBars = value => {
    // console.log('setNumBars', value)
    dispatch({ type: TYPES.UPDATE_NUMBARS, value })
  }

  const setNumBeats = value => {
    // console.log('setNumBars', value)
    dispatch({ type: TYPES.UPDATE_NUMBEATS, value })
  }

  const setNumSteps = value => {
    console.log('setNumSteps', value)
    dispatch({ type: TYPES.UPDATE_NUMSTEPS, value })
  }

  const setSignature = value => {
    // console.log('setSignature', value)
    dispatch({ type: TYPES.UPDATE_SIGNATURE, value })
  }

  return {
    isPlaying,
    tempo,
    swing,
    signature,
    numBars,
    numSteps,
    numBeats,
    bar,
    setTempo,
    setSwing,
    setSignature,
    setNumBars,
    setNumBeats,
    setNumSteps,
    sequences,
    // setSequences,
    togglePlay,
    onNoteTap
  }
}

export default useSequencer;