import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Step from './step'

import classes from './bar.module.scss'

import useSequencer from '../hooks/useSequencer'

const Bar = ( { trackId, barId, sequence } ) => {

  const { onNoteTap, numBeats, numSteps } = useSequencer();

  // useEffect(() => {

  // }, [numBeats, numSteps])

  const style = {
    gridTemplateColumns: 'repeat('+numSteps+', 1fr)'
  }

  return (
    <div 
      className={classes.bar} 
      style={style}>
        {sequence.map((s,i) => {
          return <Step key={i}
                      id={barId}
                      step={Math.floor(i/numBeats) + 1} 
                      isBeat={i % numBeats === 0} 
                      isOne={s}
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