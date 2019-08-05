import React from 'react'
import PropTypes from 'prop-types'

import classes from './processor.module.scss'

const Processor = ({children, type}) => {

    return (
        <div className={classes.processor} type={type}>{children}</div>
    )
}

Processor.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    type: PropTypes.string.isRequired
}

export default Processor