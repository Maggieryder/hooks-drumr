import { useState, useEffect, useContext } from 'react'
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

  const setSequences = ({ trackId, barId, stepId }) => {
    console.log('[useTrack] setSequence', { trackId, barId, stepId })
    // sequences[trackId][barId][stepId]
    // setState(state => ({ 
    //   ...state, 
    //   sequence: value 
    // }));
    dispatch({ type: TYPES.UPDATE_SEQUENCES, value: { trackId, trackId, barId, stepId } })
  }

  const onNoteTap = (trackId, barId, stepId) => {
    console.log(tracks.all)
    console.log('trackIndex', trackId, 'bar', barId, 'step', stepId);
    const track = tracks.all[trackId]
    console.log('track', track)
    track.triggerSample(0)
    // console.log('Sequencer.running', Sequencer.running());
    // if (!isPlaying){
    //   tracks[trackId].triggerSample(AUDIO_CONTEXT.currentTime);
    //   SEQUENCER.sequenceNote(trackId, barId, stepId);
    //   dispatch({ type: TYPES.UPDATE_SEQUENCES, value: { trackId, trackId, barId, stepId } })
    // }  
  }

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
    console.log('setTempo', value)
    dispatch({ type: TYPES.UPDATE_TEMPO, value })
  }

  const setSwing = value => {
    console.log('setSwing', value)
    dispatch({ type: TYPES.UPDATE_SWING, value })
  }

  const setNumBars = value => {
    console.log('setNumBars', value)
    dispatch({ type: TYPES.UPDATE_NUMBARS, value })
  }

  const setNumBeats = value => {
    console.log('setNumBars', value)
    dispatch({ type: TYPES.UPDATE_NUMBEATS, value })
  }

  const setNumSteps = value => {
    console.log('setNumBars', value)
    dispatch({ type: TYPES.UPDATE_NUMSTEPS, value })
  }

  const setSignature = value => {
    console.log('setSignature', value)
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
    setTempo,
    setSwing,
    setSignature,
    setNumBars,
    setNumBeats,
    setNumSteps,
    sequences,
    setSequences,
    togglePlay,
    onNoteTap
  }
}

export default useSequencer;