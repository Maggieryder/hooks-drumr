import React from 'react'

import classes from './ui.module.scss'

const Switch = ({ isOn, onClick, activeClass }) => {
    // console.log('[ switch ] isOn', isOn)

    return (
        <div className={classes.switch} onClick={onClick}>
            {/* <div className={ isOn ? activeClass : null } /> */}
            <div style={{ background: isOn ? `${activeClass}` : 'rgba(0,0,0,.2)'}}></div>
        </div>
    )
}

export default Switch