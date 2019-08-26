import React, { useEffect } from 'react'
import Select from '../components/ui/select'
import InputRange from '../components/ui/inputRange'
import Label from '../components/ui/label'
import CurrentValue from '../components/ui/currentValue'
import IncreaseBtn from '../components/ui/increaseBtn'
import DecreaseBtn from '../components/ui/decreaseBtn'
import Tracks from '../components/tracks'
import Control from '../components/control'
import Processors from '../components/processors'

import useDrumr from '../hooks/useDrumr'
import useSequencer from '../hooks/useSequencer'

import classes from './controller.module.scss'

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
    isPlaying,
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
    sequences,
    togglePlay,
    addBar,
    removeBar,
    signature,
    setSignature } = useSequencer()


  const numStepsOptions = [
    {label:'12', value:12},
    {label:'16', value:16}
  ]

  useEffect(() => {
    loadData('./resources')
    return (() => {
      
    })
  }, [])

  // useEffect(() => {
  //   const { all } = tracks
  //   console.log('[ controller ] all length', all.length)
  //   return (() => {
      
  //   })
  // }, [tracks])

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
        <IncreaseBtn clickHandler={addBar} />
        <Label>Add Bar</Label>
      </Control>
      <Control>
        <DecreaseBtn clickHandler={removeBar} style={{opacity: numBars <= 1  ? .5 : 1}}/>
        <Label>Remove Bar</Label>
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
        <button
          onClick={() => togglePlay()}
        >></button>
      </Control>
        
      </div>
      <Tracks />
      <Processors />
    </div>
  )
}

export default React.memo(Controller)