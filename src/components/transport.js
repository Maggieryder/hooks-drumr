import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Control from './control'
import IconBtn from './ui/iconBtn'
import Icon from './ui/icon'
import Status from './status'
// import Label from './ui/label'
// import CurrentValue from './ui/currentValue'
// import Switch from './ui/switch'
import TogglePlayBtn from './ui/togglePlayBtn'

// import { DrumrContext } from '../context/DrumrContext'
import useSequencer from '../hooks/useSequencer'

import vars from '../scss/_vars.scss'
import classes from './transport.module.scss'

const Transport = () => {
    // const {state:{ sequencer: { isPlaying } }} = useContext(DrumrContext)
    const { isPlaying, togglePlay } = useSequencer()
    return (
        <div className={classes.transport} >
            <div className={classes['transport-controls']}>
                <Control>
                    <IconBtn clickHandler={() => {}} style={{ borderColor: 'transparent'}}>
                        <Icon color={vars.defaultWhite} size={24} icon="previous2"/>
                    </IconBtn>
                </Control>
                <Control>
                    <IconBtn clickHandler={() => {}} style={{ borderColor: 'transparent'}}>
                        <Icon color={vars.defaultWhite} size={24} icon="backward2"/>
                    </IconBtn>
                </Control>  
                <Control>
                    <TogglePlayBtn clickHandler={togglePlay} isPlaying={isPlaying} />
                </Control>
                <Control>
                    <IconBtn clickHandler={() => {}} style={{ borderColor: 'transparent'}}>
                        <Icon color={vars.defaultWhite} size={24} icon="forward3"/>
                    </IconBtn>
                </Control>
                <Control>
                    <IconBtn clickHandler={() => {}} style={{ borderColor: 'transparent'}}>
                        <Icon color={vars.defaultWhite} size={24} icon="next2"/>
                    </IconBtn>
                </Control>
            </div>
            <Status />
        </div>
    )
}

Transport.propTypes = {
    //
}

export default Transport