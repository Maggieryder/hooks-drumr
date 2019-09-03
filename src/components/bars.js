import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Bar from './bar'

import { SEQUENCER } from '../api'

// import useSequencer from '../hooks/useSequencer'
import { DrumrContext } from '../context/DrumrContext'

import classes from './bars.module.scss'

const Bars = ( { track } ) => {

  // const { sequences, numSteps, numBars } = useSequencer()

  const {state:{ sequencer }} = useContext(DrumrContext)

  const { sequences, numSteps, numBars } = sequencer

  const barSequence = sequences.filter(s => s.id === track.id())[0].sequence

  useEffect(() => {
    console.log('[ Bars ] barSequence', track.id(), ': ', barSequence)
    SEQUENCER.updateSequences(sequences)
  }, [sequences, numSteps, numBars])

  const style = {
    // width: 'calc(100% * '+numBars/2+')',
    // gridTemplateColumns: 'repeat('+numBars+', 1fr)'
  }

  return (
    <div className={classes.bars} style={style}>
      {barSequence && barSequence.map((s,i) => {
        return <Bar key={i} trackId={track.id()} barId={i} sequence={s}/>
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