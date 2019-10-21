import React, { useState, useRef, useContext, useEffect} from 'react'
import { useDrag } from 'react-use-gesture'
import { useSpring, animated } from 'react-spring'

import { ViewsContext } from '../context/ViewsContext'
import useSequencer from '../hooks/useSequencer'

import vars from '../scss/_vars.scss';
import classes from './barDisplay.module.scss'

const BarDisplay = () => {

    const { zoom } = useContext(ViewsContext)[0]

    const { numBars, currentBar, updateCurrentBar } = useSequencer()

    const bars = Array.from(Array(numBars).keys())

    const [{ x }, set] = useSpring(() => ({ x: 0}))

    const [ isDragging, setIsDragging ] = useState(false)

    const marqueeRef = useRef()
    const boundaryRef = useRef()

    useEffect(() => {
        const boundaryWidth = boundaryRef.current.getBoundingClientRect().width
        const seg = boundaryWidth / numBars
        set( { 
            x: seg * currentBar,
            immediate: true
        })
    }, [currentBar, numBars])
    

    


    

    const bind = useDrag(({ initial, first, last, movement, memo = [x.getValue()] }) => {
        const boundaries = boundaryRef.current.getBoundingClientRect()
        const { width, right, left} = boundaries
        const seg = width / numBars
        // let offset
        if (first) { 
            const marqueeXPos = marqueeRef.current.getBoundingClientRect().left
            // offset = memo[0] - initial[0]
            // console.log('marqueeXPos', marqueeXPos, memo[0], initial[0])
            set({
                x: 0, // currentBar * seg,
                immediate: true
            })
            setIsDragging(true) 
            // return memo
        }
        if (last) { 
            setIsDragging(false) 
            
            const newBarIndex = Math.max(Math.round((memo[0] + movement[0]) / seg), 0)
            // console.log('seg * newBarIndex', seg * newBarIndex)
            updateCurrentBar(newBarIndex)
            set( { 
                x: seg * newBarIndex,
                immediate: true
            })
        }

        // console.log('memo[0]', memo[0])
        // console.log('movement[0]', movement[0])

        set({
            x: Math.min(Math.max(memo[0] + movement[0], left), right - (width / numBars * zoom)),
            immediate: true
        })
        return memo
    }, 
    {
        // dragDelay: true,
        // drag: true, 
    })

    

    const style = {
        transform: isDragging ? x.interpolate(x => `translateX(${x}px)`) : `translateX(${Math.min(currentBar * 100 / zoom, (numBars - zoom) * 100 / zoom)}%)`,
        // transform: x.interpolate(x => `translateX(${x}px)`),
        transitionDuration: isDragging ? '0s' : '.5s',
        width: `${100 / numBars * zoom}%`
    }

    // style={{width: `${3 * numBars}%`}}
    // `${3 * zoom}%`

    return (
        <div className={classes.barspane}>
            <animated.div {...bind()} ref={marqueeRef} className={classes.indicator} style={style}></animated.div>
            <div ref={boundaryRef} className={classes['bar-display-container']} >
                {/* <div {...bind()} ref={marqueeRef} className={classes.indicator} style={{width: '6%', transform: `translateX(${Math.min(currentBar * 50, (numBars - 2) * 50)}%)`}}></div> */}
                
                {
                    bars.map((b,i) => <div key={i} className={classes['bar-display']} style={{color: i === currentBar ? vars.greencolor : vars.defaultWhite, width: `${100 / numBars}%`}} onClick={() => updateCurrentBar(i)}>{i < numBars ? i+1 : ''}</div>)
                }
            </div>
        </div>
    )
}

export default BarDisplay