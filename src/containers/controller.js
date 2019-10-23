import React, { useEffect, useRef, useCallback } from 'react'

import Select from '../components/ui/select'
import InputRange from '../components/ui/inputRange'
import Label from '../components/ui/label'
import CurrentValue from '../components/ui/currentValue'
import IconBtn from '../components/ui/iconBtn'
import BarIndicator from '../components/ui/barIndicator'
import Tracks from '../components/tracks'
import Control from '../components/control'
import Processors from '../components/processors'
import Transport from '../components/transport'
import BarDisplay from '../components/barDisplay'


import { useAuth } from "../hooks/useAuth.js";

// import { DrumrProvider } from "../context/DrumrContext";
import useDrumr from '../hooks/useDrumr'
import useSequencer from '../hooks/useSequencer'
import useTrack from '../hooks/useTrack'

import vars from '../scss/_vars.scss'

import classes from './controller.module.scss'
import uiclasses from '../components/ui/ui.module.scss'

import { MIXER, SEQUENCER } from '../api'

const Controller = () => {

  const auth = useAuth()

  const { 
    loadData, 
    loadBuffers, 
    kits, 
    currentKitId, 
    setCurrentKitId, 
    kitBuffers,
    verbs,   
    tracks,
    addTrack } = useDrumr()

  const {
    dispatch,
    tempo, 
    setTempo, 
    swing, 
    setSwing, 
    numBars, 
    numSteps, 
    setNumSteps,
    currentBar,
    addBars,
    removeBar,
    updateCurrentBar } = useSequencer()

    const { triggerPlay } = useTrack()

    const { all, soloed, muted } = tracks


  const numStepsOptions = [
    {label:'12', value:12},
    {label:'16', value:16}
  ]

  useEffect(() => {
    console.log('[controller] INIT')
    loadData('./resources')
    SEQUENCER.init(dispatch, triggerPlay)
    SEQUENCER.updateCurrentBar(currentBar)
    SEQUENCER.updateNumBars(numBars)
    SEQUENCER.updateTempo(tempo)
    // addTrack(0)
    return (() => {
      SEQUENCER.destroy()
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
  }, [kits, currentKitId])

  useEffect(() => {
    // console.log('[ controller ] kitBuffers', kitBuffers)
    if (all.length < 1 && kitBuffers[0].buffer) addTrack(0)
  }, [kitBuffers, all])

  

  useEffect(() => { 
    if (verbs) {
      // console.log('verbs', verbs[0])
      loadBuffers(verbs[0], 'verbBuffers')
    } 
    return (() => {
      
    })
  }, [verbs])

  useEffect(() => {
    SEQUENCER.updateCurrentBar(currentBar) 
  }, [currentBar]);

  const marqueeRef = useRef()
  const scrollerRef = useRef()

  const moveMarquee = useCallback(
    (perc) => {
      const { width } =  marqueeRef.current.getBoundingClientRect()
      // console.log('marqueeRef.current', width, perc, width * perc)
      marqueeRef.current.style.transform =  `translateX(${width * perc}px)`
    },
    [],
  )

  const moveTracks = useCallback(
    (perc) => {
      const { width } =  scrollerRef.current.getBoundingClientRect()
      // console.log('scrollerRef.current width perc w*p', width, perc, width * perc)
      scrollerRef.current.scrollLeft =  `translateX(${width * perc}px)`
    },
    [],
  )

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
              options={numStepsOptions}
              onValueChange={ value => setNumSteps(value) }
              initialValue={numSteps.toString()}
            />
            <Label>Resolution</Label>
          </Control>
          <Control>
            <BarIndicator items={Array.from(Array(numBars).keys())} 
                      barClickHandler={updateCurrentBar} 
                      addClickHandler={addBars} 
                      removeClickHandler={removeBar} 
                      numBars={numBars} 
                      currentBar={currentBar} />
            <Label>+/- 2 Bars</Label>
          </Control> 
          <Control style={{WebkitAlignItems:'flex-start', alignItems:'flex-start'}}>
            <IconBtn clickHandler={() => addTrack(tracks.all.length)} colors={[vars.defaultWhite, vars.greencolor]} size={8} icon='plus' />
            <Label>Add Track</Label>
          </Control>
          <Control>
            {auth.user ? <p className={uiclasses.smalltxt}>Logged in as {auth.user.email}</p> : <p className={uiclasses.smalltxt}>Sign in to access more features -></p>}        
          </Control>
        </div>
        
        <BarDisplay moveTracks={moveTracks} ref={marqueeRef}/>
        

        <Tracks moveMarquee={moveMarquee} ref={scrollerRef}/>

        
        <div className={classes.bottompanel}>
        
          <Processors />
          <Transport />
        </div>   
      </div>
    
  )
}

export default React.memo(Controller)