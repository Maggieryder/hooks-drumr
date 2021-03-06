import React, { useEffect, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import Control from './control'
import Select from './ui/select'
import InputRange from './ui/inputRange'
import Label from './ui/label'
import CurrentValue from './ui/currentValue'
import Switch from './ui/switch'
import IconBtn from './ui/iconBtn'
import Soundwave from './ui/soundwave'

import * as TYPES from '../actions/types'

import { DrumrContext } from '../context/DrumrContext'

import useTrack from '../hooks/useTrack'

import { AUDIO_CONTEXT } from '../api'

import vars from '../scss/_vars.scss'

import classes from './controls.module.scss'

const Controls = ( { track } ) => {

  const {state:{ controller: { kitBuffers }, tracks: { all, soloed } }, dispatch} = useContext(DrumrContext)

  const { 
    voiceId, setVoiceId,
    gain, setGain,
    pan, setPan,
    reverbSend, setReverbSend,
    delaySend, setDelaySend,
    mute, setMute,
    solo, setSolo,
    triggerPlay
  } = useTrack();

  const removeTrack = useCallback((id) => {
    dispatch({ type: TYPES.REMOVE_TRACK, trackId: id })
    dispatch({ type: TYPES.REMOVE_SEQUENCE, trackId: id })
  // console.log(' - - - TRACKS', tracks)
  },
  []
)

  useEffect(() => {
    console.log('[track] INIT', track.id())
    setGain({trackId: track.id(), value: 5})
    setPan({trackId: track.id(), value: 0})
    setVoiceId({trackId: track.id(), value: 0})
    return (() => {
        
    })
}, [])

  useEffect(() => {
    // console.log('[Controls] track.id voiceId', track.id(), voiceId)
    // console.log('[ Controls ] kitBuffers[voiceId].label', kitBuffers[voiceId].label)
    if(kitBuffers) all[track.id()].assignTrackBuffer(kitBuffers[voiceId].buffer)
    // all[track.id()].triggerSample(AUDIO_CONTEXT.currentTime)
    return (() => {
      
    })
  }, [voiceId, kitBuffers])

  if(!kitBuffers) return null

  return (
    <div className={classes.controls}> 
      <Control>
        <IconBtn clickHandler={() => removeTrack(track.id())} colors={[vars.defaultWhite, vars.redcolor]} size={8} icon='cross' style={{ borderColor: vars.mutedWhite}} />
        {/* <Label>Delete Track</Label> */}
      </Control> 
      <Control>
        <Select
          options={ kitBuffers }
          onValueChange={value => setVoiceId({ trackId: track.id(), value })}
          initialValue={voiceId.toString()}
          />
      </Control> 
      <Control>
        <InputRange id='reverb' min={0} max={10} step={.1} onChange={e => setReverbSend({ trackId: track.id(), value: e.target.value })} value={+reverbSend}></InputRange>
        <Label>Reverb</Label>
        <CurrentValue>{Math.round(reverbSend).toString()}</CurrentValue>
      </Control>
      <Control>
        <InputRange id='delay' min={0} max={10} step={.1} onChange={e => setDelaySend({ trackId: track.id(), value: e.target.value })} value={+delaySend}></InputRange>
        <Label>Delay</Label>
        <CurrentValue>{Math.round(delaySend).toString()}</CurrentValue>
      </Control>
      <Control>
        <InputRange id='gain' min={0} max={10} step={.1} onChange={e => setGain({ trackId: track.id(), value: e.target.value })} value={+gain}></InputRange>
        <Label>Gain</Label>
        <CurrentValue>{Math.round(gain).toString()}</CurrentValue>
      </Control>
      <Control>
        <InputRange id='pan' min={-5} max={5} step={.1} onChange={e => setPan({ trackId: track.id(), value: e.target.value })} value={+pan}></InputRange>
        <Label>Pan</Label>
        <CurrentValue>{Math.round(pan).toString()}</CurrentValue>
      </Control>
      <Control>
        <Switch isOn={(mute && !solo) || (soloed.length >= 1 && !track.isSolo()) } onClick={() => setMute({ trackId: track.id(), value: !mute })} activeClass={vars.redcolor} />
        <Label>Mute</Label>
      </Control>
      <Control>
        <Switch isOn={solo} onClick={() => setSolo({ trackId: track.id(), value: !solo })} activeClass={vars.greencolor} />
        <Label>Solo</Label>
      </Control>
      <Control>
        {kitBuffers && <Soundwave label={kitBuffers[voiceId].label} 
          buffer={kitBuffers[voiceId].buffer}
          isMute={(mute && !solo) || (soloed.length >= 1 && !track.isSolo())}
          onClickHandler={() => {
            triggerPlay({trackId: track.id(), value: true}) 
            track.triggerSample(AUDIO_CONTEXT.currentTime)
          }} track={track}/>}
      </Control>
    </div>
  )
}

Controls.propTyes = {
  track: PropTypes.object.isRequired
}

export default Controls