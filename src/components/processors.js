import React, { useState, useEffect } from 'react'
import Control from './control'
import Select from './ui/select'
import InputRange from './ui/inputRange'
import Label from './ui/label'
import CurrentValue from './ui/currentValue'
import Switch from './ui/switch'
import Processor from './processor'

import classes from './processors.module.scss'


// import useDrumr from '../hooks/useDrumr'
import useReverb from '../hooks/useReverb'
import useDelay from '../hooks/useDelay'
import useCompressor from '../hooks/useCompressor'

const Processors = () => {

  const { verbBuffers, reverbOn, setReverbOn, reverbId, setReverbId } = useReverb()

  const { delayOn, setDelayOn, delayTime, setDelayTime, delayFeedback, setDelayFeedback, delayFrequency, setDelayFrequency } = useDelay()

  const { compOn, setCompOn, compThreshold, setCompThreshold, compKnee, setCompKnee, compRatio, setCompRatio, compAttack, setCompAttack, compRelease, setCompRelease } = useCompressor()

  return (
    <div className={classes.processors}>
      { verbBuffers && <Processor type='reverb'>
                          <Control>
                            <Label>Reverb</Label>
                            <Switch isOn={reverbOn} onClick={ () => setReverbOn(!reverbOn)} activeClass='rgb(21, 255, 0)' />
                          </Control>
                          <Control>  
                            <Select options={verbBuffers} onValueChange={value => setReverbId(value)} initialValue={reverbId.toString()} />
                          </Control>
                        </Processor> }

      <Processor type='delay'>
        <Control>
          <Label>Delay</Label>
          <Switch isOn={delayOn} onClick={ () => setDelayOn(!delayOn)} activeClass='rgb(21, 255, 0)' />
        </Control>
        <Control>
          <Label>Time</Label>
          <CurrentValue>{delayTime.toString()}</CurrentValue>
          <InputRange id='delayTime' min={0} max={1} step={0.001} onChange={e => setDelayTime(e.target.value)} value={+delayTime} />
        </Control>
        <Control>
          <Label>Feedback</Label>
          <CurrentValue>{delayFeedback.toString()}</CurrentValue>
          <InputRange id='delayFeedback' min={0} max={.95} step={0.001} onChange={e => setDelayFeedback(e.target.value)} value={+delayFeedback} />
        </Control>
        <Control>
          <Label>Frequency</Label>
          <CurrentValue>{delayFrequency.toString()}</CurrentValue>
          <InputRange id='delayFrequency' min={0} max={4000} step={4} onChange={e => setDelayFrequency(e.target.value)} value={+delayFrequency} />
        </Control>
        
      </Processor>
      <Processor type='compressor'>
        <Control>
          <Label>Compressor</Label>
          <Switch isOn={compOn} onClick={ () => setCompOn(!compOn)} activeClass='rgb(21, 255, 0)' />
        </Control>
        <Control>
          <Label>Threshold</Label>
          <CurrentValue>{compThreshold.toString()}</CurrentValue>
          <InputRange id='compThreshold' min={-100} max={0} step={.1} onChange={e => setCompThreshold(e.target.value)} value={+compThreshold} />
        </Control>
        <Control>
          <Label>Knee</Label>
          <CurrentValue>{compKnee.toString()}</CurrentValue>
          <InputRange id='compKnee' min={0} max={40} step={0.04} onChange={e => setCompKnee(e.target.value)} value={+compKnee} />
        </Control>
        <Control>
          <Label>Ratio</Label>
          <CurrentValue>{compRatio.toString()}</CurrentValue>
          <InputRange id='compRatio' min={0} max={20} step={0.02} onChange={e => setCompRatio(e.target.value)} value={+compRatio} />
        </Control>
        <Control>
          <Label>Attack</Label>
          <CurrentValue>{compAttack.toString()}</CurrentValue>
          <InputRange id='compAttack' min={0} max={1} step={0.001} onChange={e => setCompAttack(e.target.value)} value={+compAttack} />
        </Control>
        <Control>
          <Label>Release</Label>
          <CurrentValue>{compRelease.toString()}</CurrentValue>
          <InputRange id='compRelease' min={0} max={1} step={0.001} onChange={e => setCompRelease(e.target.value)} value={+compRelease} />
        </Control>
        
      </Processor>
    </div>
  )
}

export default Processors