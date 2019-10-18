import React from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'

import classes from './step.module.scss'

import vars from '../scss/_vars.scss'

const Step = ({ onTap, step, isBeat, isOne, color, velocity }) => {

  // console.log('[ step ] update id / isOne', step, isOne)

  const [ref, inView, entry] = useInView({
    /* Options */
    // threshold: 0,
    rootMargin: '0% -3.1%',
  })

  const props = useSpring({ opacity: inView ? 1 : 0 })

  const style = {
    // '--size': isBeat ? '20px' : isCurrentBar ? '10px' :'5px',
    // '--size': isBeat ? '20px' : '5px',
    '--size': isOne ? '6px' : isBeat ? '4px' : '2px',
    // '--viz': isCurrentBar && isCurrentStep ? 0 : 1,
    // '--scale': isCurrentBar && isCurrentStep ? 1.5 : 1,
    '--bgcolor': isOne ? color : vars.defaultStepBg,
    // color: isBeat ? vars.beatTxtColor : 'transparent',
    // background:  isOne ? 'red' : '#505258'
    opacity: inView ? 1 : 0 
  }

  const handleClick = event => {
    // prevIsOn = !prevIsOn
    // console.log('step isOn before', isOn)
    onTap(!isOne)
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={classes.step} 
      // style={props}
      >
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