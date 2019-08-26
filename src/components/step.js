import React from 'react'
import PropTypes from 'prop-types'
import classes from './step.module.scss'

const Step = ({ onTap, step, isBeat, isOne, velocity, sustain }) => {

  const style = {
    width: isBeat ? '30px' : '20px',
    height: isBeat ? '30px' : '20px',
    color: isBeat ? '#202020' : 'transparent',
    background: isOne ? 'red' : '#505258'
  }

  const handleClick = event => {
    // prevIsOn = !prevIsOn
    // console.log('step isOn before', isOn)
    onTap(!isOne)
  }

  return (
    <div onClick={handleClick}
      className={classes.step} >
        <div style={style} >{(step)}</div>
    </div>
  );
}

Step.propTypes = {
  onTap: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  isBeat: PropTypes.bool,
  isOne: PropTypes.number
}

export default Step