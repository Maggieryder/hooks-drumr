import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Step from './step'

import classes from './bar.module.scss'

import useDrumr from '../hooks/useDrumr'

const Bar = ( { trackId, barId } ) => {

  const { onNoteTap, numBeats, numSteps } = useDrumr();

  const [steps, setSteps] = useState([])

  useEffect(() => {
    // console.log('numSteps', numSteps)
    setSteps(Array.apply(null, {length: numSteps}).map(Number.call, Number))
    return (() => {
      
     })
  }, [numSteps, numBeats])

  const style = {
    gridTemplateColumns: 'repeat('+numSteps+', 1fr)'
  }

  return (
    <div 
      className={classes.bar} 
      style={style}>
        {steps.map(i => {
          return <Step key={i} 
                      step={Math.floor(i/numBeats) + 1} 
                      isBeat={i % numBeats === 0} 
                      onTap={() => onNoteTap(trackId, barId, i)} 
                      velocity={.5} />
        })}
    </div>
  );
}

Bar.propTypes = {
  trackId: PropTypes.number.isRequired,
  barId: PropTypes.number.isRequired,
  onNoteTap: PropTypes.func,
  numBeats: PropTypes.number,
  numSteps: PropTypes.number
}

export default Bar