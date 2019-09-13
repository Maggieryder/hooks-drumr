import React, { useContext } from 'react'

// import useSequencer from '../hooks/useSequencer'

import { DrumrContext } from '../context/DrumrContext'

import classes from './barDisplay.module.scss'

const BarDisplay = () => {

    // const { numBeats, numSteps, currentBar, currentStep, tempo, isPlaying } = useSequencer();
    const {state:{ sequencer: { numBars, numSteps, currentBar, currentStep, tempo, isPlaying } }} = useContext(DrumrContext)

    const barStyle = {

    }

    const stepStyle = {
        transform: 'translateY(20%)'
    }

    return (
        <div className={classes['bar-display-container']}>
            <div className={classes['bar-display']} style={barStyle}>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
            </div>
            <div className={classes['bar-display']} >
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
            </div>
            <div className={classes['bar-display']} >
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
            </div>
            <div className={classes['bar-display']} >
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
                <div className={classes['step-display']} style={stepStyle}></div>
            </div>
        </div>
    )
}

export default BarDisplay