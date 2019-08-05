import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Bar from './bar'

import useDrumr from '../hooks/useDrumr'

import classes from './bars.module.scss'

const Bars = ( { track } ) => {

  const { numBars } = useDrumr();

  const [bars, setBars] = useState([0,1])

  useEffect(() => {
    setBars(Array.apply(null, {length: numBars}).map(Number.call, Number))
    console.log('[ Bars ] track.id, bars', track.id(), bars)
    return (() => {
      
    })
  }, [numBars])

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