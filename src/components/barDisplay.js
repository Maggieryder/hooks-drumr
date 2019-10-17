import React, { useContext } from 'react'

import { DrumrContext } from '../context/DrumrContext'

import vars from '../scss/_vars.scss';
import classes from './barDisplay.module.scss'

const BarDisplay = () => {

    const {state:{ sequencer: { numBars, currentBar }}} = useContext(DrumrContext)

    const bars = Array.from(Array(numBars).keys())

    return (
        <div className={classes['bar-display-container']}>
            <div className={classes.indicator} style={{width: '6%', transform: `translateX(${Math.min(currentBar * 50, (numBars - 2) * 50)}%)`}}></div>
            {
                bars.map((b,i) => <div key={i} className={classes['bar-display']} style={{color: i === currentBar ? vars.greencolor : vars.defaultWhite}}>{i < numBars ? i+1 : ''}</div>)
            }
        </div>
    )
}

export default BarDisplay