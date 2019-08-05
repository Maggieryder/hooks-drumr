import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './step.module.scss'

const Step = ({ onTap, step, isBeat, velocity, sustain }) => {

  const [ isOn, setIsOn ] = useState(false);

  // useEffect(() => {
  //   // 
  //   return (() => {
  //     // 
  //   })
  // }, [isOn])

  const style = {
    width: isBeat ? '30px' : '20px',
    height: isBeat ? '30px' : '20px',
    color: isBeat ? '#202020' : 'transparent',
    background: isOn ? 'red' : '#505258'
  }

  const handleClick = event => {
    // prevIsOn = !prevIsOn
    setIsOn(!isOn)
    onTap()
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
  isBeat: PropTypes.bool
}

export default Step