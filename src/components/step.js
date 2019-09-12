import React from 'react'
import PropTypes from 'prop-types'
import classes from './step.module.scss'

const Step = ({ onTap, step, isBeat, isOne, isCurrentBar, isCurrentStep, velocity }) => {

  // console.log('[ step ] update id / isOne', step, isOne)

  const style = {
    // width: isBeat ? '30px' : isCurrentBar ? '20px' :'10px',
    // height: isBeat ? '30px' : isCurrentBar ? '20px' :'10px',
    '--size': isBeat ? '20px' : isCurrentBar ? '10px' :'5px',
    // '--viz': isCurrentBar && isCurrentStep ? 0 : 1,
    '--scale': isCurrentBar && isCurrentStep ? 1.5 : 1,
    '--bgcolor': isOne ? 'red' : '#505258',
    color: isBeat ? '#202020' : 'transparent',
    // background:  isOne ? 'red' : '#505258'
  }

  const handleClick = event => {
    // prevIsOn = !prevIsOn
    // console.log('step isOn before', isOn)
    onTap(!isOne)
  }

  return (
    <div onClick={handleClick}
      className={classes.step} >
        <div style={style} >{step}</div>
    </div>
  );
}

Step.propTypes = {
  onTap: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  isBeat: PropTypes.bool,
  isOne: PropTypes.number
}

export default React.memo(Step)