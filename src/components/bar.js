import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Step from './step'

import classes from './bar.module.scss'

import useSequencer from '../hooks/useSequencer'

const Bar = ( { trackId, barId } ) => {

  const { onNoteTap, numBeats, numSteps } = useSequencer();

  const [steps, setSteps] = useState([])

  useEffect(() => {
    // console.log('numSteps', numSteps)
    // setSteps(Array.apply(null, {length: numSteps}).map(Number.call, Number))
    setSteps(Array.apply(null, {length: numSteps}).map(() => 0))
    //Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0) // array of zeros
    return (() => {
      
     })
  }, [numSteps])

  const style = {
    gridTemplateColumns: 'repeat('+numSteps+', 1fr)'
  }

  return (
    <div 
      className={classes.bar} 
      style={style}>
        {steps.map((n,i) => {
          return <Step key={i} 
                      step={Math.floor(i/numBeats) + 1} 
                      isBeat={i % numBeats === 0} 
                      onTap={(isOn) => onNoteTap(trackId, barId, i, isOn)} 
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