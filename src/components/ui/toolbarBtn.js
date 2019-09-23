import React, { useState } from 'react'

import Icon from './icon';

import classes from './ui.module.scss'

const ToolbarBtn = ({ clickHandler, colors, size, icon }) => {

    const [hover, setHover] = useState(false)

    return (
        
        <button className={classes['toolbar-btn']}
            onClick={clickHandler}
            onMouseEnter={()=>{setHover(true)}} 
            onMouseLeave={()=>{setHover(false)}}>
                <Icon color={hover ? colors[1] : colors[0]} size={size} icon={icon} />
        </button>
        
    )
}


export default ToolbarBtn