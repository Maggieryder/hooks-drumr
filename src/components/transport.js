import React from 'react'
// import PropTypes from 'prop-types'
import Control from './control'
import IconBtn from './ui/iconBtn'
import Status from './status'
import TogglePlayBtn from './ui/togglePlayBtn'

import useSequencer from '../hooks/useSequencer'

import vars from '../scss/_vars.scss'
import classes from './transport.module.scss'

const Transport = () => {
    const { isPlaying, togglePlay, currentBar, updateCurrentBar, numBars } = useSequencer()
    return (
        <div className={classes.transport} >
            <div className={classes['transport-controls']}>
                <Control>
                    <IconBtn clickHandler={() => updateCurrentBar(0)} colors={[vars.defaultWhite, vars.greencolor]} size={24} icon='previous2' altClass={classes['transport-btn']} />
                </Control>
                <Control>
                    <IconBtn clickHandler={() => updateCurrentBar(Math.max(currentBar - 1, 0))} colors={[vars.defaultWhite, vars.greencolor]} size={24} icon='backward2' altClass={classes['transport-btn']} />   
                </Control>  
                <Control>
                    <TogglePlayBtn clickHandler={togglePlay} isPlaying={isPlaying} />
                </Control>
                <Control>
                    <IconBtn clickHandler={() => updateCurrentBar(Math.min(currentBar + 1, numBars - 1))} colors={[vars.defaultWhite, vars.greencolor]} size={24} icon='forward3' altClass={classes['transport-btn']} />  
                </Control>
                <Control>
                    <IconBtn clickHandler={() => updateCurrentBar(numBars - 1)} colors={[vars.defaultWhite, vars.greencolor]} size={24} icon='next2' altClass={classes['transport-btn']} />  
                </Control>
            </div>
            <Status />
        </div>
    )
}

// Transport.propTypes = {
//     //
// }

export default Transport