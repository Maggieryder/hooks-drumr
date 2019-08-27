import React from 'react'
import IncreaseBtn from './increaseBtn'
import DecreaseBtn from './decreaseBtn'

import classes from './ui.module.scss'

const BarIndicator = ({ items, barClickHandler, addClickHandler, removeClickHandler, numBars, currentBar }) => (
    <div className={classes['btn-group']} >
        {numBars < 4  && <button onClick={addClickHandler} className={classes['btn']}>+</button>}
        {items.map((item,i) => <button key={i} onClick={() => barClickHandler(item + 1)} className={classes['btn']} style={{border: currentBar === (item + 1) ? '1px solid rgb(21, 255, 0)' : ''}}>{item + 1}</button>)}
        {numBars > 1  && <button onClick={removeClickHandler} className={classes['btn']} >-</button>}
    </div>
)

export default BarIndicator