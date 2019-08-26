import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Bar from './bar'

import { SEQUENCER } from '../api'

import useSequencer from '../hooks/useSequencer'

import classes from './bars.module.scss'

const Bars = ( { track } ) => {

  const { sequences, numSteps, numBars } = useSequencer()

  const [bars, setBars] = useState(Array.apply(null, {length: numBars}).map(Number.call, Number))

  useEffect(() => {
    setBars(Array.apply(null, {length: numBars}).map(Number.call, Number))
    // console.log('[ Bars ] track.id, bars', track.id(), bars)
    return (() => {
      
    })
  }, [numBars])

  useEffect(() => {
    console.log('[Bars] sequence update', sequences)
    SEQUENCER.updateSequences(sequences)
  }, [sequences, numSteps, numBars])

  const style = {
    width: 'calc(100% * '+numBars/2+')',
    gridTemplateColumns: 'repeat('+numBars+', 1fr)'
  }

  return (
    <div className={classes.bars} style={style}>
      {bars.map(i => {
        return <Bar key={i} trackId={track.id()} barId={i}/>
      })}
    </div>
  )
}

Bars.propTypes = {
  track: PropTypes.object.isRequired,
  numBars: PropTypes.number
}

export default Bars