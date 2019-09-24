import React from 'react'
import vars from '../../scss/_vars.scss';
import classes from './ui.module.scss'

const BarIndicator = ({ items, barClickHandler, addClickHandler, removeClickHandler, numBars, currentBar }) => (
    <div className={classes['btn-group']} >
        {numBars < 4  && <button onClick={addClickHandler} className={classes['btn']}>+</button>}
        {items.map((item,i) => <button key={i} onClick={() => barClickHandler(item)} className={classes['btn']} style={{color: currentBar === item ? vars.greencolor : vars.defaultWhite}}>{item + 1}</button>)}
        {numBars > 1  && <button onClick={removeClickHandler} className={classes['btn']} >-</button>}
    </div>
)

export default BarIndicator