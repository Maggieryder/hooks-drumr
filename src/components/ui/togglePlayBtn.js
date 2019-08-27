import React from 'react';
import classes from './ui.module.scss';


const TogglePlayBtn = ({ clickHandler, isPlaying }) => (
    <button className={classes['toggle-play-btn']}
        onClick={clickHandler}>
        {/* {isPlaying ? '||' : '>'} */}
    </button>
)

export default TogglePlayBtn