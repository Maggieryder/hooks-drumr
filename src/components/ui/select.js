import React, { useState } from 'react'
import PropTypes from 'prop-types'

import classes from './ui.module.scss'

const Select = ({id, options, onValueChange, initialValue}) => {

    const [ query, setQuery ] = useState(initialValue ? initialValue : options[0].value)
    // const queryInputRef = useRef();

    const onChange = event => {
        setQuery(event.target.value)
        onValueChange(event.target.value)
    }

    const buildOptions = options => {
        return options.map(option => {
            return <option key={option.value} value={option.value}>{option.label}</option>
        })
    }

    // useEffect(() => {
    //     console.log('[Select] query', query)
    //     // setQuery(initialValue ? initialValue : options[0].value)
    //     return (() => {
          
    //     })
    // }, [query]);

    return (
        <select
            className={classes.select}
            id={id}
            onChange={event => onChange(event)}
            value={query}
            // ref={queryInputRef}
        >
            {buildOptions(options)}
        </select>
    )
}

Select.propTypes = {
    id: PropTypes.string,
    options: PropTypes.array.isRequired,
    onValueChange: PropTypes.func.isRequired,
    initialValue: PropTypes.string
}

export default Select