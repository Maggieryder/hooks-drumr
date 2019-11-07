import React, { useState, useEffect, useCallback, useContext } from 'react'

import Select from '../components/ui/select'
import InputRange from '../components/ui/inputRange'
import Label from '../components/ui/label'
import CurrentValue from '../components/ui/currentValue'
import IconBtn from '../components/ui/iconBtn'
import BarIndicator from '../components/ui/barIndicator'
import Control from '../components/control'
import Processors from '../components/processors'
import Transport from '../components/transport'
import ScrollControl from '../components/scrollControl'

import { useAuth } from "../hooks/useAuth"
import useLoadData from '../hooks/useLoadData'

import { DrumrContext } from '../context/DrumrContext'
import useSequencer from '../hooks/useSequencer'
import useTrack from '../hooks/useTrack'

import useLoadBuffers from '../hooks/useLoadBuffers'

import vars from '../scss/_vars.scss'

import classes from './controller.module.scss'
import uiclasses from '../components/ui/ui.module.scss'

import { AUDIO_CONTEXT, MIXER, SEQUENCER } from '../api'

import * as TYPES from '../actions/types'

import Track from '../api/Track'

import { magentacolor, purplecolor, orangecolor, cyancolor, neoncolor } from '../scss/_vars.scss'

const DRUM_COLORS = [magentacolor, purplecolor, orangecolor, cyancolor, neoncolor ]

const Controller = () => {

  const {state, dispatch} = useContext(DrumrContext)

  const { controller, tracks } = state

  const { response, error, isDataLoading } = useLoadData('./resources.json')

  const { isBufferLoading, isBufferError, loadBuffers } = useLoadBuffers()

  const auth = useAuth()

  const { 
    kits, 
    currentKitId, 
    kitBuffers,
    verbs   
  } = controller

  const {
    tempo, 
    setTempo, 
    swing, 
    setSwing, 
    numBars, 
    numSteps, 
    setNumSteps,
    currentBar,
    addBars,
    removeBars,
    updateCurrentBar } = useSequencer()

  const { triggerPlay } = useTrack()

  const { all, soloed, muted } = tracks

  const [isKitLoading, setKitLoading] = useState(false)
  const [isVerbLoading, setVerbLoading] = useState(false)


  const numStepsOptions = [
    {label:'12', value:12},
    {label:'16', value:16}
  ]

  const addTrack = useCallback((id) => {
    const track = new Track(id, DRUM_COLORS[id], AUDIO_CONTEXT, MIXER)
    dispatch({ type: TYPES.ADD_SEQUENCE, value: { trackId:track.id(), numSteps, numBars } })
    dispatch({ type: TYPES.ADD_TRACK, value: { track: track } })
  },
  [ numSteps, numBars ]
)


const saveData = useCallback(
  ({ kits, verbs }) => {
    console.log('saveData', kits )
    dispatch({ type: TYPES.STORE_KITS, value: kits })
    dispatch({ type: TYPES.STORE_VERBS, value: verbs })
    // loadBuffers(kits[currentKitId])
  }, []
)


const setCurrentKitId = useCallback(index => {
  console.log('setCurrentKit', index)
  dispatch({ type: TYPES.UPDATE_KIT_ID, value: index })
})

  useEffect(() => {
    console.log('[controller] INIT', )
    SEQUENCER.init(dispatch, triggerPlay)
    SEQUENCER.updateCurrentBar(currentBar)
    SEQUENCER.updateNumBars(numBars)
    SEQUENCER.updateTempo(tempo)
    addTrack(0)
    return (() => {
      // console.log('should never get here!')
      SEQUENCER.destroy()
    })
  }, [])

  useEffect(() => {
    // console.log('[ controller ] response', response)
    if (response) {
      saveData(response)
    }  
  }, [response])

  useEffect(() => {
    if (kits) {
      setKitLoading(true)
      loadBuffers(kits[currentKitId], (bufferData) => {
        dispatch({ type: TYPES.UPDATE_KIT_BUFFERS, value: bufferData })
        setKitLoading(false)
      })
    }  
  }, [kits, currentKitId])

  useEffect(() => { 
    if (verbs) {
      setVerbLoading(true)
      loadBuffers(verbs[0], (bufferData) => {
        dispatch({ type: TYPES.UPDATE_VERB_BUFFERS, value: bufferData })
        setVerbLoading(false)
      })
    } 
  }, [verbs])

  useEffect(() => {
    console.log('[ controller ] tracks: all', all)
    SEQUENCER.updateTracks(all)
    MIXER.updateTracks(all)   
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
    SEQUENCER.updateCurrentBar(currentBar) 
  }, [currentBar])

  if ( isDataLoading || !kitBuffers ) return <h1>Loading...</h1>
  if ( error || isBufferError ) return <h1>Something went wrong!</h1>

  return (
      <div className={classes.controller}>
        <div className={classes.topPane}>
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
                      removeClickHandler={removeBars} 
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
        
        <ScrollControl />

        <div className={classes.bottomPane}>    
          <Processors />
          <Transport />
        </div>   
      </div>
    
  )
}

export default React.memo(Controller)