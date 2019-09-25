import React from 'react'

import classes from './control.module.scss'

const Control = ({children, style}) => {
  return (
    <div className={classes.control} style={style} >{children}</div>
  )
}

export default Control