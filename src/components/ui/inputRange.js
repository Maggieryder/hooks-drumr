import React from 'react'
import PropTypes from 'prop-types'

import classes from './ui.module.scss'

const InputRange = ({ min, max, step, value, onChange }) => (
    <input
        type="range"
        step={step || 1}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        style={{'--track-width': `${(value - min) / (max - min) * 100}%`}}
        className={classes['input-range']}
    />
)

InputRange.propTypes = { 
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
}
  
export default InputRange