import React from 'react'

import classes from './control.module.scss'

const Control = ({children}) => {
  return (
    <div className={classes.control}>{children}</div>
  )
}

export default Control