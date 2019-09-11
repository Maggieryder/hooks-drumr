import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Control from './control'
import Label from './ui/label'
import CurrentValue from './ui/currentValue'
import Switch from './ui/switch'
import TogglePlayBtn from './ui/togglePlayBtn'

// import { DrumrContext } from '../context/DrumrContext'
import useSequencer from '../hooks/useSequencer'

import classes from './transport.module.scss'

const Transport = () => {
    // const {state:{ sequencer: { isPlaying } }} = useContext(DrumrContext)
    const { isPlaying, togglePlay } = useSequencer()
    return (
        <div className={classes.transport} >
            <Control>
                <TogglePlayBtn clickHandler={togglePlay} isPlaying={isPlaying} />
                <Label>{ isPlaying ? 'Pause' : 'Play'}</Label>
            </Control>
        </div>
    )
}

Transport.propTypes = {
    //
}

export default Transport