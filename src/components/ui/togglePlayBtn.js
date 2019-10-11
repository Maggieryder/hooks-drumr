import React from 'react'
import classes from './ui.module.scss'


const TogglePlayBtn = ({ clickHandler, isPlaying }) => {
    let btnClass = classes['toggle-play-btn']
    if (isPlaying) btnClass += ` ${classes['is-playing']}`

    return (
        <button className={btnClass}
        onClick={clickHandler}>
            {/* {isPlaying ? '||' : '>'} */}
        </button>
    )
}
    


export default TogglePlayBtn