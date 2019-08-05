import React, { useEffect } from 'react'
import Select from '../components/ui/select'
import InputRange from '../components/ui/inputRange'
import Label from '../components/ui/label'
import CurrentValue from '../components/ui/currentValue'
import Tracks from '../components/tracks'
import Control from '../components/control'
import Processors from '../components/processors'

import useDrumr from '../hooks/useDrumr'

import classes from './controller.module.scss'

const Controller = () => {
  const { 
          loadData, 
          loadBuffers, 
          kits, 
          currentKitId, 
          setCurrentKitId, 
          verbs, 
          tempo, 
          setTempo, 
          swing, 
          setSwing, 
          numBars, 
          setNumBars, 
          numBeats, 
          setNumBeats, 
          numSteps, 
          setNumSteps,
          tracks,
          addTrack,
          setTracks } = useDrumr()


  const numBarsOptions = [
    {label:'1', value:1},
    {label:'2', value:2},
    {label:'4', value:4}
  ]
  const numStepsOptions = [
    {label:'12', value:12},
    {label:'16', value:16}
  ]
  const numBeatsOptions = [
    {label:'3', value:3},
    {label:'4', value:4}
  ]
  useEffect(() => {
    loadData('./resources')
    return (() => {
      
    })
  }, [])

  useEffect(() => {
    const { all } = tracks
    console.log('all', all.length)
    return (() => {
      
    })
  }, [tracks])

  useEffect(() => {
    if (kits) {
      // console.log('kits', kits, currentKit)
      loadBuffers(kits[currentKitId], 'kitBuffers')
      
      //if (all.length<1) setTracks()
    }  
    return (() => {
      
    })
  }, [kits, currentKitId]);

  useEffect(() => { 
    if (verbs) {
      console.log('verbs', verbs[0])
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
        <Select
          options={numBarsOptions}
          onValueChange={ value => setNumBars(value) }
          initialValue={numBars.toString()}
        />
        <Label>Number of bars</Label>
      </Control>
      <Control>
        <Select
          options={numBeatsOptions}
          onValueChange={ value => setNumBeats(value) }
          initialValue={numBeats.toString()}
        />
        <Label>Number of beats</Label>
      </Control>
      <Control>
        <Select
          options={numStepsOptions}
          onValueChange={ value => setNumSteps(value) }
          initialValue={numSteps.toString()}
        />
        <Label>Number of steps</Label>
      </Control>
      <Control>
        <button
          onClick={ value => addTrack(tracks.all.length) }
        >+</button>
        <Label>Add Track</Label>
      </Control>
        
      </div>
      <Tracks />
      <Processors />
    </div>
  )
}

export default Controller