import { useContext, useCallback } from 'react'

import { DrumrContext } from '../context/DrumrContext'
import { TrackContext } from '../context/TrackContext'

import * as TYPES from '../actions/types'

// import useDrumr from '../hooks/useDrumr'

const useTrack = () => {

  const {state: { tracks: { all }, controller: { kitBuffers } }, dispatch } = useContext(DrumrContext)

  const [state, setState] = useContext(TrackContext)

  const { 
    trackId,
    color,
    context, 
    // buffer,
    voiceId,
    gain,
    pan,
    reverbSend,
    delaySend,
    solo,
    mute,
    isInPlay
     } = state

  const setVoiceId = useCallback(
    ({ trackId, value }) => {
      // console.log('[useTrack] setVoiceId', value)
      // tracks.all[trackId].assignTrackBuffer(kitBuffers[voiceId].buffer)
      setState(state => ({ 
        ...state, 
        voiceId: value,
        buffer:  kitBuffers[value].buffer
      }))
    },
    [all, kitBuffers]
  )

  const setGain = useCallback(
    ({ trackId, value }) => {
      // console.log('[useTrack] setGain', { trackId, value })
      all[trackId].updateVolume(value)
      setState(state => ({ 
        ...state, 
        gain: value 
      }))
    },
    [all]
  )

  const setPan = useCallback(
    ({ trackId, value }) => {
      // console.log('[useTrack] setPan', { trackId, value })
      all[trackId].updatePan(value * .2)
      setState(state => ({ 
        ...state, 
        pan: value 
      }))
    },
    [all]
  )

  const setReverbSend = useCallback(
    ({ trackId, value }) => {
      // console.log('[useTrack] setReverbSend', { trackId, value })
      all[trackId].updateReverbSend(value)
      setState(state => ({ 
        ...state, 
        reverbSend: value 
      }))
    },
    [all]
  )

  const setDelaySend = useCallback(
    ({ trackId, value }) => {
      // console.log('[useTrack] setDelaySend', { trackId, value })
      all[trackId].updateDelaySend(value)
      setState(state => ({ 
        ...state, 
        delaySend: value 
      }))
    },
    [all]
  )

  const setSolo = useCallback(
    ({ trackId, value }) => {
      // console.log('[useTrack] setSolo', { trackId, value }) 
      value ? dispatch({ type: TYPES.SOLO_TRACK, value: all[trackId] }) : dispatch({ type: TYPES.UNSOLO_TRACK, value: trackId  })
      // dispatch({ type: TYPES.SOLO_TRACK, value: all[trackId] })
      all[trackId].toggleSolo()
      setState(state => ({ 
        ...state, 
        solo: value 
      }))
    },
    [all]
  )

  const setMute = useCallback(
    ({ trackId, value }) => {
      // console.log('[useTrack] setMute', { trackId, value })
      value ? dispatch({ type: TYPES.MUTE_TRACK, value: all[trackId] }) : dispatch({ type: TYPES.UNMUTE_TRACK, value: trackId  })
      // dispatch({ type: TYPES.MUTE_TRACK, value: all[trackId] })
      all[trackId].toggleMute()
      setState(state => ({ 
        ...state, 
        mute: value 
      }))
    },
    [all]
  )

  const triggerPlay = useCallback(
    ({ trackId, value }) => {
      // console.log('[useTrack] triggerPlay', { trackId, value })
      //all[trackId].triggerSample()
      setState(state => ({
        ...state, 
        isInPlay: value
      }))
    },
    [all]
  )

  return {
    trackId,
    color,
    context,
    // buffer,
    voiceId,
    gain,
    pan,
    reverbSend,
    delaySend,
    solo,
    mute,
    setVoiceId,
    setGain,
    setPan,
    setReverbSend,
    setDelaySend,
    setSolo,
    setMute,
    isInPlay,
    triggerPlay
  }
}

export default useTrack;