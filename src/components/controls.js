import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Control from './control'
import Select from './ui/select'
import InputRange from './ui/inputRange'
import Label from './ui/label'
import CurrentValue from './ui/currentValue'
import Switch from './ui/switch'
import DecreaseBtn from './ui/decreaseBtn'

import useDrumr from '../hooks/useDrumr'
import useTrack from '../hooks/useTrack'

import classes from './controls.module.scss'

const Controls = ( { track } ) => {

  const { tracks: { all, soloed }, kitBuffers, removeTrack } = useDrumr()

  const { 
    voiceId, setVoiceId,
    gain, setGain,
    pan, setPan,
    reverbSend, setReverbSend,
    delaySend, setDelaySend,
    mute, setMute,
    solo, setSolo
  } = useTrack();

  useEffect(() => {
    console.log('[track] INIT', track.id())
    setGain({trackId: track.id(), value: 5})
    setPan({trackId: track.id(), value: 0})
    return (() => {
        
    })
}, [])

  useEffect(() => {
    // console.log('[Controls] track.id voiceId', track.id(), voiceId)
    // console.log('[ Controls ] kitBuffers', kitBuffers)
    all[track.id()].assignTrackBuffer(kitBuffers[voiceId].buffer)
    return (() => {
      
    })
  }, [voiceId, kitBuffers])

  return (
    <div className={classes.controls}> 
      <Control>
        <DecreaseBtn clickHandler={() => removeTrack(track.id())} style={{ borderColor: 'red', color: 'red'}}/>
      </Control> 
      <Control>
        <Select
          options={ kitBuffers }
          onValueChange={value => setVoiceId({ trackId: track.id(), value })}
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
        <Switch isOn={(mute && !solo) || (soloed.length >= 1 && !track.isSolo()) } onClick={() => setMute({ trackId: track.id(), value: !mute })} activeClass='red' />
        <Label>Mute</Label>
      </Control>
      <Control>
        <Switch isOn={solo} onClick={() => setSolo({ trackId: track.id(), value: !solo })} activeClass='rgb(21, 255, 0)' />
        <Label>Solo</Label>
      </Control>
    </div>
  )
}

Controls.propTyes = {
  track: PropTypes.object.isRequired
}

export default Controls