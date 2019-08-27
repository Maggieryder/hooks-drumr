import React from 'react'

import classes from './ui.module.scss'

const DecreaseBtn = ({ clickHandler, style }) => (
    <button className={classes['decrease-btn']}
            onClick={clickHandler}
            style={style}></button>
)

export default DecreaseBtn