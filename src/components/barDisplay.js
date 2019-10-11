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
            <div className={classes.indicator} style={{width: '2%', transform: `translateX(${Math.min(currentBar * 50, (numBars - 2) * 50)}%)`}}></div>
            {
                bars.map((b,i) => <div key={i} className={classes['bar-display']} style={{color: i === currentBar ? vars.greencolor : i < numBars ? vars.defaultWhite : 'transparent'}}>{i+1}</div>)
            }
        </div>
    )
}

//, background:  i < numBars ? vars.mutedBlack : vars.defaultBlack

export default BarDisplay