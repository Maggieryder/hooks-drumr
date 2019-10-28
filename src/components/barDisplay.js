import React, { forwardRef } from 'react'

import useSequencer from '../hooks/useSequencer'

import vars from '../scss/_vars.scss';
import classes from './barDisplay.module.scss'

const BarDisplay = forwardRef((props, ref) => {

    const { numBars, currentBar, updateCurrentBar } = useSequencer()

    const bars = Array.from(Array(numBars).keys())

    return (
        <div ref={ref} className={classes['bar-display-container']} >                
            {
                bars.map((b,i) => <div key={i} className={classes['bar-display']} style={{color: i === currentBar ? vars.greencolor : vars.defaultWhite, width: `${100 / numBars}%`}} onClick={() => updateCurrentBar(i)}>{i < numBars ? i+1 : ''}</div>)
            }
        </div>
    )
})

export default BarDisplay