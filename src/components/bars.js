import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Bar from './bar'

import { SEQUENCER } from '../api'

import { DrumrContext } from '../context/DrumrContext'

import classes from './bars.module.scss'

const Bars = ( { track } ) => {

  const {state:{ sequencer: { sequences, numBars }}} = useContext(DrumrContext)

  const [barSequence, setBarSequence] = useState(sequences.filter(s => s.id === track.id())[0].sequence)

  // const [{ sl, xy }, set] = useSpring(() => ({ sl: 0, xy: [0, 0] }))
  // const props = useSpring({ scroll: 100, from: { scroll: 0 } })

  // const onScroll = useCallback(e => {console.log('scolling')}, [])

  useEffect(() => {
    // console.log('[ Bars ] barSequence', track.id(), ': ', barSequence)
    SEQUENCER.updateSequences(sequences)
    setBarSequence(sequences.filter(s => s.id === track.id())[0].sequence)
  }, [sequences, numBars])

  const style = {
    gridTemplateColumns: `repeat(${numBars}, 1fr)`,
  }

  return (
    <div className={classes.bars} style={style} >
      {barSequence && barSequence.map((s,i) => {
        return <Bar key={i} trackId={track.id()} barId={i} sequence={s} color={track.color()} isMute={track.isMute() && !track.isSolo()}/>
      })}
    </div>
  )
}

Bars.propTypes = {
  track: PropTypes.object.isRequired,
  sequences: PropTypes.array,
  numBars: PropTypes.number
}

export default Bars