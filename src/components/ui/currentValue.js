import React from 'react'

import classes from './ui.module.scss'

const CurrentValue = ({children}) => (
    <div className={classes['current-value']}>{children}</div>
)

export default CurrentValue