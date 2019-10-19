import React, { useState, useRef, useContext } from 'react'
import { useDrag } from 'react-use-gesture'
import { useSpring, animated } from 'react-spring'

import { ViewsContext } from '../context/ViewsContext'
import useSequencer from '../hooks/useSequencer'

import vars from '../scss/_vars.scss';
import classes from './barDisplay.module.scss'

const BarDisplay = () => {

    const { zoom } = useContext(ViewsContext)[0]

    const [ isDragging, setIsDragging ] = useState(false)

    const marqueeRef = useRef()
    const boundaryRef = useRef()

    const boundaries = [0 , 2000, 0, 0]

    // const boundaries = boundaryRef.current.getBoundingClientRect()
    // console.log(rect.top, rect.right, rect.bottom, rect.left);

    const [{ x }, set] = useSpring(() => ({ x: 0}))

    const bind = useDrag(({ first, last, movement, memo = [x.getValue()] }) => {

            if (first) { setIsDragging(true) }
            if (last) { 
                setIsDragging(false) 
                updateCurrentBar(2)
                set({
                    x: Math.min(currentBar * 50, (numBars - 2) * 50),
                    immediate: false
                })
            }

            const [top, right, bottom, left] = boundaries

            console.log('memo[0]', memo[0])
            console.log('movement[0]', movement[0])

            set({
                x: Math.min(Math.max(memo[0] + movement[0], left), right),
                immediate: true
            })
            return memo
        }, 
        {
            // dragDelay: 300,
            // drag: true, 
        }
    )

    const { numBars, currentBar, updateCurrentBar } = useSequencer()

    const bars = Array.from(Array(numBars).keys())

    const style = {
        transform: isDragging ? x.interpolate(x => `translateX(${x}px)`) : `translate3d(${Math.min(currentBar * 100 / zoom, (numBars - zoom) * 100 / zoom)}%, 0, 0)`,
        width: `${6 * zoom}%`
    }

    return (
        <div className={classes.barspane}>
            <animated.div className={classes.indicator} style={style}></animated.div>
            <div className={classes['bar-display-container']}>
                {/* <div {...bind()} ref={marqueeRef} className={classes.indicator} style={{width: '6%', transform: `translateX(${Math.min(currentBar * 50, (numBars - 2) * 50)}%)`}}></div> */}
                
                {
                    bars.map((b,i) => <div key={i} className={classes['bar-display']} style={{color: i === currentBar ? vars.greencolor : vars.defaultWhite}} onClick={() => updateCurrentBar(i)}>{i < numBars ? i+1 : ''}</div>)
                }
            </div>
        </div>
    )
}

export default BarDisplay