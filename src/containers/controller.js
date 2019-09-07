import React, { useEffect } from 'react'
import Select from '../components/ui/select'
import InputRange from '../components/ui/inputRange'
import Label from '../components/ui/label'
import CurrentValue from '../components/ui/currentValue'
import IncreaseBtn from '../components/ui/increaseBtn'
import TogglePlayBtn from '../components/ui/togglePlayBtn'
import BarIndicator from '../components/ui/barIndicator'
import Tracks from '../components/tracks'
import Control from '../components/control'
import Processors from '../components/processors'

import useDrumr from '../hooks/useDrumr'
import useSequencer from '../hooks/useSequencer'

import classes from './controller.module.scss'

import { MIXER, SEQUENCER } from '../api'

const Controller = () => {
  const { 
    loadData, 
    loadBuffers, 
    kits, 
    currentKitId, 
    setCurrentKitId, 
    verbs,   
    tracks,
    addTrack } = useDrumr()

  const {
    dispatch,
    isPlaying,
    tempo, 
    setTempo, 
    swing, 
    setSwing, 
    numBars, 
    numSteps, 
    setNumSteps,
    currentBar,
    togglePlay,
    addBar,
    removeBar,
    updateCurrentBar } = useSequencer()

    const { all, soloed, muted } = tracks


  const numStepsOptions = [
    {label:'12', value:12},
    {label:'16', value:16}
  ]

  useEffect(() => {
    console.log('[controller] INIT')
    loadData('./resources')
    SEQUENCER.init(dispatch)
    return (() => {
      
    })
  }, [])

  useEffect(() => {
    // console.log('[ controller ] all length', all.length)
    SEQUENCER.updateTracks(all)
    MIXER.updateTracks(all)
    return (() => {
      
    })
  }, [all])

  useEffect(() => {
    // console.log('[ controller ] soloed', soloed)
    soloed.length >= 1  ?  MIXER.soloTracks(soloed) : MIXER.unSoloTracks()
  }, [soloed])

  useEffect(() => {
    // console.log('[ controller ] muted', muted)
    MIXER.updateMutedTracks(muted)
  }, [muted])

  useEffect(() => {
    if (kits) {
      // console.log('loadBuffers kits', kits, currentKitId)
      loadBuffers(kits[currentKitId], 'kitBuffers')
    }  
    return (() => {
      
    })
  }, [kits, currentKitId]);

  useEffect(() => { 
    if (verbs) {
      // console.log('verbs', verbs[0])
      loadBuffers(verbs[0], 'verbBuffers')
    } 
    return (() => {
      
    })
  }, [verbs]);


  return (
    <div className={classes.controller}>
      <div className={classes.toppanel}>
        {kits ? <Control>
                  <Select
                    options={kits}
                    onValueChange={ value => setCurrentKitId(value) }
                    initialValue={currentKitId.toString()}
                  />
                  <Label>Current kit</Label>
                </Control> : null }
      <Control>
        <InputRange id='tempo' min={30} max={160} step={1} onChange={e => setTempo(e.target.value)} value={+tempo}></InputRange>
        <Label>Tempo</Label>
        <CurrentValue>{tempo+ ' bpm'}</CurrentValue>
      </Control>
      <Control>
        <InputRange id='swing' min={0} max={100} step={1} onChange={e => setSwing(e.target.value)} value={+swing}></InputRange>
        <Label>Swing</Label>
        <CurrentValue>{swing +'%'}</CurrentValue>
      </Control>
      <Control>
        <BarIndicator items={Array.from(Array(numBars).keys())} 
                  barClickHandler={updateCurrentBar} 
                  addClickHandler={addBar} 
                  removeClickHandler={removeBar} 
                  numBars={numBars} 
                  currentBar={currentBar} />
        <Label>Bars</Label>
      </Control>
      <Control>
        <Select
          options={numStepsOptions}
          onValueChange={ value => setNumSteps(value) }
          initialValue={numSteps.toString()}
        />
        <Label>Resolution</Label>
      </Control>
      <Control>
        <IncreaseBtn clickHandler={() => addTrack(tracks.all.length)} />
        <Label>Add Track</Label>
      </Control>
      <Control>
        <TogglePlayBtn clickHandler={togglePlay} isPlaying={isPlaying} />
        <Label>{ isPlaying ? 'Pause' : 'Play'}</Label>
      </Control>
        
      </div>
      <Tracks />
      <Processors />
    </div>
  )
}

export default React.memo(Controller)