import React from 'react'

import classes from './ui.module.scss'

const Label = ({children}) => (
    <label className={classes.label}>{children}</label>
)

export default Label