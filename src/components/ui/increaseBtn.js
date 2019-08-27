import React from 'react'

import classes from './ui.module.scss'

const IncreaseBtn = ({ clickHandler}) => (
    <button className={classes['increase-btn']}
            onClick={clickHandler}></button>
)

export default IncreaseBtn