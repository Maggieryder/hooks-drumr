import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Bar from './bar'

import { SEQUENCER } from '../api'

import { DrumrContext } from '../context/DrumrContext'

import classes from './bars.module.scss'

const Bars = ( { track } ) => {

  const {state:{ sequencer }} = useContext(DrumrContext)

  const { sequences, numSteps, numBars, currentBar } = sequencer

  const [segment, setSegment] = useState(.25)

  const [barSequence, setBarSequence] = useState(sequences.filter(s => s.id === track.id())[0].sequence)

  // const barSequence = sequences.filter(s => s.id === track.id())[0].sequence

  useEffect(() => {
    console.log('[ Bars ] barSequence', track.id(), ': ', barSequence)
    SEQUENCER.updateSequences(sequences)
    setSegment((100/numBars))
    setBarSequence(sequences.filter(s => s.id === track.id())[0].sequence)
  }, [sequences, numSteps, numBars])

  const style = {
    width: `${100 * (numBars/2) }%`,
    gridTemplateColumns: `repeat(${numBars}, 1fr)`,
    transform: `translateX(-${Math.min(segment * currentBar, 100 - (segment * 2))}%)`
  }

  return (
    <div className={classes.bars} style={style}>
      {barSequence && barSequence.map((s,i) => {
        return <Bar key={i} trackId={track.id()} barId={i} sequence={s} color={track.color()} isMute={track.isMute() && !track.isSolo()}/>
      })}
    </div>
  )
}

Bars.propTypes = {
  track: PropTypes.object.isRequired,
  sequences: PropTypes.array,
  numBars: PropTypes.number,
  numSteps: PropTypes.number
}

export default Bars