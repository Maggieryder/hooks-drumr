import React from 'react'
import PropTypes from 'prop-types'

import Step from './step'

import classes from './bar.module.scss'

import useSequencer from '../hooks/useSequencer'

const Bar = ( { trackId, barId, sequence, color, isMute } ) => {

  const { onNoteTap, numBars, numBeats, numSteps, currentBar, currentStep, tempo, isPlaying } = useSequencer();

  const isCurrentBar = currentBar === barId

  // console.log('[ bar ] --beat 60/tempo', Number((60 / tempo) / numBeats).toFixed(4))

  const style = {
    gridTemplateColumns: 'repeat('+numSteps+', 1fr)',
    // width: isPlaying ?  '50%' : isCurrentBar ? '50%' : '25%',
    // width: `${numBars * 50}vw`,
    '--progress': isCurrentBar ? isPlaying ? (currentStep / (numSteps - 1)) : ((currentStep+1) / numSteps) : 0,
    '--visible' : isMute ? 0 : 1,
    '--bartime' : isPlaying ? currentStep===0 ? '0s' : (60 / tempo) / numBeats +'s' : '.25s'
  }

  return (
    <div 
      className={classes.bar}
      id={ barId + 1 } 
      style={style}>
        {sequence.map((s,i) => {
          return <Step key={i}
                      step={Math.floor(i/numBeats) + 1} 
                      isBeat={i % numBeats === 0} 
                      isOne={s}
                      color={color}
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

export default React.memo(Bar)