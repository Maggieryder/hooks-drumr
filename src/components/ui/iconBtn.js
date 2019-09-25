import React, { useState } from 'react'

import Icon from './icon'

// import vars from '../../scss/_vars.scss'
import classes from './ui.module.scss'

const IconBtn = ({ clickHandler, colors, size, icon, altClass }) => {

    const [hover, setHover] = useState(false)

    return (
        <button className={altClass ? altClass : classes['icon-btn']}
                onClick={clickHandler}
                onMouseEnter={()=>{setHover(true)}} 
                onMouseLeave={()=>{setHover(false)}}
                style={{borderColor: hover ? colors[1] : colors[0]}}>
                    <Icon color={hover ? colors[1] : colors[0]} size={size} icon={icon} />
                </button>
    )
}


export default IconBtn