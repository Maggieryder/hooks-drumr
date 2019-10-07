import React from 'react'
import paginate from '../../utils/paginate'
import vars from '../../scss/_vars.scss';
import classes from './ui.module.scss'

const BarIndicator = ({ items, barClickHandler, addClickHandler, removeClickHandler, numBars, currentBar }) => {
    const { pages, startIndex, endIndex, startPage, endPage } = paginate(numBars, currentBar, 1, 4)
    console.log('items.length', items.length)
    console.log('pages', pages)
    console.log('startIndex', startIndex)
    console.log('endIndex', endIndex)
    console.log('startPage', startPage)
    console.log('endPage', endPage)
    const bars = pages.slice(startIndex, endIndex)
    console.log('bars', bars)
    


    // let totalBars = Math.ceil(items.length / numBars);

    // // ensure current page isn't out of range
    // if (currentBar < 1) {
    //     currentBar = 1;
    // } else if (currentBar > totalBars) {
    //     currentBar = totalBars;
    // }

    // let startBar: number, endBar: number;
    // if (totalBars <= maxBars) {
    //     // total pages less than max so show all pages
    //     startBar = 1;
    //     endBar = totalBars;
    // } else {
    //     // total pages more than max so calculate start and end pages
    //     let maxBarsBeforeCurrentBar = Math.floor(maxBars / 2);
    //     let maxBarsAfterCurrentBar = Math.ceil(maxBars / 2) - 1;
    //     if (currentBar <= maxBarsBeforeCurrentBar) {
    //         // current page near the start
    //         startBar = 1;
    //         endBar = maxBars;
    //     } else if (currentBar + maxBarsAfterCurrentBar >= totalBars) {
    //         // current page near the end
    //         startBar = totalBars - maxBars + 1;
    //         endBar = totalBars;
    //     } else {
    //         // current page somewhere in the middle
    //         startBar = currentBar - maxBarsBeforeCurrentBar;
    //         endBar = currentBar + maxBarsAfterCurrentBar;
    //     }
    // }

    // // calculate start and end item indexes
    // let startIndex = (currentBar - 1) * pageSize;
    // let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // // create an array of pages to ng-repeat in the pager control
    // let pages = Array.from(Array((endBar + 1) - startBar).keys()).map(i => startBar + i);

    return (
        <div className={classes['btn-group']} >       
            {pages.map((item,i) => <button key={i} onClick={() => barClickHandler(item - 1)} className={classes['btn']} style={{color: currentBar === item - 1 ? vars.greencolor : vars.defaultWhite}}>{startPage + i}</button>)}
            {/* {numBars > 1  && <button onClick={removeClickHandler} className={classes['btn']} >-</button>} */}
            <button onClick={addClickHandler} className={classes['btn']}>+</button>
        </div>
    )
}

    


export default BarIndicator