import React, { useContext } from 'react'


// import useSequencer from '../hooks/useSequencer'

import { DrumrContext } from '../context/DrumrContext'

import vars from '../scss/_vars.scss';
import classes from './barDisplay.module.scss'

const BarDisplay = () => {

    // const { numBeats, numSteps, currentBar, currentStep, tempo, isPlaying } = useSequencer();
    const {state:{ sequencer: { numBars, currentBar, isPlaying }}} = useContext(DrumrContext)

    const bars = Array.from(Array(100).keys())

    // const barStyle = {
    //     color: currentBar
    // }

    return (
        <div className={classes['bar-display-container']}>
            <div className={classes.indicator} style={{width: '4%', transform: `translateX(${currentBar * 25}%)`}}></div>
            {
                bars.map((b,i) => <div key={i} className={classes['bar-display']} style={{color: i === currentBar ? vars.greencolor : vars.defaultWhite, background:  i < numBars ? vars.mutedWhite : 'transparent'}}>{i+1}</div>)
            }
        </div>
    )
}

export default BarDisplay