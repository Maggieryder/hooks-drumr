import React from 'react'

import classes from './ui.module.scss'

const IconBtn = ({ clickHandler, style, children }) => (
    <button className={classes['icon-btn']}
            onClick={clickHandler}
            style={style}>
                {children}
            </button>
)

export default IconBtn