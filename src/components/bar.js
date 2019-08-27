import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Step from './step'

import classes from './bar.module.scss'

import useSequencer from '../hooks/useSequencer'

const Bar = ( { trackId, barId, sequence } ) => {

  const { onNoteTap, numBeats, numSteps, currentBar, currentStep } = useSequencer();

  const isCurrentBar = currentBar === barId

  const style = {
    gridTemplateColumns: 'repeat('+numSteps+', 1fr)',
    // borderBottom: isCurrentBar ? '1px solid rgb(21, 255, 0)' : '',
    width: isCurrentBar ? '50%' : '25%',
    '--progress': isCurrentBar ? ((currentStep+1) / numSteps) : 0
  }

  return (
    <div 
      className={classes.bar} 
      style={style}>
        {sequence.map((s,i) => {
          return <Step key={i}
                      step={Math.floor(i/numBeats) + 1} 
                      isBeat={i % numBeats === 0} 
                      isOne={s}
                      isCurrentBar={isCurrentBar}
                      isCurrentStep={i===currentStep}
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