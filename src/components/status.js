import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Control from './control'
// import IconBtn from './ui/iconBtn'
// import Icon from './ui/icon'
// import Label from './ui/label'
// import CurrentValue from './ui/currentValue'
// import Switch from './ui/switch'


import { DrumrContext } from '../context/DrumrContext'

import vars from '../scss/_vars.scss'
import classes from './status.module.scss'

const Status = () => {
    const {state:{ sequencer: { currentBar, currentStep, numBeats } }} = useContext(DrumrContext)
    return (
        <div className={classes.status} >
            <div className={classes.statusbar}>{currentBar < 99 ? currentBar < 9 ? `00${currentBar + 1}` : `0${currentBar + 1}` : currentBar + 1 }</div>
            <div className={classes.statusbeat}>{ Math.floor(currentStep / numBeats) + 1 }</div>
            <div className={classes.statusstep}>{currentStep < 9 ? `0${currentStep + 1}` : currentStep + 1 }</div>
        </div>
    )
}

Status.propTypes = {
    //
}

export default Status