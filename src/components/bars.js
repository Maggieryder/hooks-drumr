import React, { useState, useContext, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated, interpolate , config } from 'react-spring'
import { useScroll, useDrag, useWheel, useGesture } from 'react-use-gesture'
import Bar from './bar'

import { SEQUENCER } from '../api'

import { DrumrContext } from '../context/DrumrContext'

import classes from './bars.module.scss'

const Bars = ( { track } ) => {

  const barsRef = useRef()

  const bind = useGesture({
    onWheel: state => {
      console.log('useScroll ev', state)
    },
    onDrag: state => {
      console.log('useDrag ev', state)
    },
  }, 
  { domTarget: barsRef,
    dragDelay: 300 }
  )

  // const bind = useWheel(
  //   state => {
  //     /* scroll logic */
  //     // !last && event.preventDefault()
  //     console.log('useScroll ev', state)
  //   }, 
  //   { domTarget: barsRef }
  //     // window: barsRef.current.parentNode,
  //     // scroll: true,
  //     // wheel: true }
  // )

  const {state:{ sequencer }} = useContext(DrumrContext)

  const { sequences, numSteps, numBars, currentBar } = sequencer

  // const [segment, setSegment] = useState(.25)

  // const [scrollLeft, setScrollLeft] = useState(0)

  const [barSequence, setBarSequence] = useState(sequences.filter(s => s.id === track.id())[0].sequence)

  const [{ sl, xy }, set] = useSpring(() => ({ sl: 0, xy: [0, 0] }))

  const onScroll = useCallback(e => {console.log('scolling')}, [])

  useEffect(() => {
    if (barsRef.current) {
      bind()
    }
  },[bind, barsRef])

  useEffect(() => {
    // console.log('[ Bars ] barSequence', track.id(), ': ', barSequence)
    SEQUENCER.updateSequences(sequences)
    // setSegment((100/numBars))
    // const target = barsRef.current
    // const position = target.getBoundingClientRect()
    // const seg = position.width / numBars
    // setScrollLeft(`-${Math.min(seg * currentBar, position.width - (seg * 2))}`)
    // setSegment(position.width / numBars)
    setBarSequence(sequences.filter(s => s.id === track.id())[0].sequence)
  }, [sequences, numSteps, numBars, currentBar])

  // useEffect(()=> {
  //   console.log('scrollLeft', `${scrollLeft}px`)
  //   // barsRef.current.offsetLeft = -scrollLeft
  // }, [scrollLeft])

  const style = {

    width: `${100 * (numBars/2) }%`,
    gridTemplateColumns: `repeat(${numBars}, 1fr)`,
    // transform: `translateX(-${scrollLeft}px)`
    // transform: `translateX(-${Math.min(segment * currentBar, 100 - (segment * 2))}%)`
  }

  return (
    <div ref={barsRef} className={classes.bars} style={style} >
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