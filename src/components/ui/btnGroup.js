import React from 'react'

import classes from './ui.module.scss'

const BtnGroup = ({ items, clickHandler }) => (
    <div className={classes['btn-group']}>
        { items.map((item,i) => <button key={i} onClick={clickHandler} className={classes['btn']}>item</button>) }
    </div>
)

export default BtnGroup