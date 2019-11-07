import React, { useContext } from 'react'
// import PropTypes from 'prop-types'
// import IconBtn from './ui/iconBtn'
// import Icon from './ui/icon'
// import Label from './ui/label'
// import CurrentValue from './ui/currentValue'
// import Switch from './ui/switch'

import { AUDIO_CONTEXT } from '../api'

import { DrumrContext } from '../context/DrumrContext'

import classes from './status.module.scss'

function msToTime(ct) {
    let h, m, s, secs, mins,
    ms = ct.toString().split('.')[1]
    s = Math.floor(ct)
    m = Math.floor(s / 60);
    secs = s % 60;
    h = Math.floor(m / 60);
    mins = m % 60;
    h = h % 24;
    if (secs < 10) secs = '0' +secs
    if (mins < 10) mins = '0' +mins
    if (h < 10) h = '0' +h
    // return  h + ':' + mins + ':' + secs + ':' + ms
    return [h,mins,secs,ms]
}


const Status = () => {
    const {state:{ sequencer: { currentBar, currentStep, numBeats } }} = useContext(DrumrContext)

    const currentTimeArr = msToTime(AUDIO_CONTEXT.currentTime.toFixed(3))
    return (
        <div className={classes.status} >
            {/* <div className={classes.ctxtime}>
                <div>{currentTimeArr[0] +':'}</div>
                <div>{currentTimeArr[1] +':'}</div>
                <div>{currentTimeArr[2] +':'}</div>
                <div>{currentTimeArr[3]}</div>
            </div> */}
            <div></div>
            <div></div>
            <div className={classes.barbeatstep} >
                <div className={classes.statusbar}>{currentBar < 99 ? currentBar < 9 ? `00${currentBar + 1}` : `0${currentBar + 1}` : `${currentBar + 1}` }</div>
                <div className={classes.statusbeat}>{ Math.floor(currentStep / numBeats) + 1 }</div>
                <div className={classes.statusstep}>{currentStep < 9 ? `0${currentStep + 1}` : currentStep + 1 }</div>
            </div>
            
        </div>
    )
}

// Status.propTypes = {
//     //
// }

export default Status