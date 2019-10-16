import React, { useState, useContext, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated, interpolate , config } from 'react-spring'
import Bar from './bar'

import { SEQUENCER } from '../api'

import { DrumrContext } from '../context/DrumrContext'

import classes from './bars.module.scss'

const Bars = ( { track } ) => {

  const barsRef = useRef()

  const {state:{ sequencer }} = useContext(DrumrContext)

  const { sequences, numSteps, numBars, currentBar } = sequencer

  const [segment, setSegment] = useState(.25)

  const [scrollLeft, setScrollLeft] = useState(0)

  const [barSequence, setBarSequence] = useState(sequences.filter(s => s.id === track.id())[0].sequence)

  const [{ sl, xy }, set] = useSpring(() => ({ sl: 0, xy: [0, 0] }))

  const onScroll = useCallback(e => {console.log('scolling')}, [])

  // const barSequence = sequences.filter(s => s.id === track.id())[0].sequence

  useEffect(() => {
    console.log('[ Bars ] barSequence', track.id(), ': ', barSequence)
    SEQUENCER.updateSequences(sequences)
    // setSegment((100/numBars))
    const target = barsRef.current
    const position = target.getBoundingClientRect()
    setSegment(position.width / numBars)
    setBarSequence(sequences.filter(s => s.id === track.id())[0].sequence)
  }, [sequences, numSteps, numBars])

  useEffect(()=> {
    const target = barsRef.current
    const position = target.getBoundingClientRect()
    // setSegment(position.width / numBars)
    console.log('position.width / numBars', position.width)
    setScrollLeft(`${Math.min(segment * currentBar, position.width - (segment * 2))}`)
  }, [currentBar, segment])

  const style = {
    width: `${100 * (numBars/2) }%`,
    gridTemplateColumns: `repeat(${numBars}, 1fr)`,
    // transform: `translateX(-${Math.min(segment * currentBar, 100 - (segment * 2))}%)`
  }

  return (
    <div ref={barsRef} className={classes.bars} style={style} onScroll={e => {console.log('scolling')}} scrollleft={scrollLeft}>
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