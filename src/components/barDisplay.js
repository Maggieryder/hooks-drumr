import React, { useState, useRef, useContext, useEffect, useCallback, forwardRef } from 'react'
import { useDrag } from 'react-use-gesture'
import { useSpring, animated } from 'react-spring'

import { ViewsContext } from '../context/ViewsContext'
import useSequencer from '../hooks/useSequencer'

import vars from '../scss/_vars.scss';
import classes from './barDisplay.module.scss'

const BarDisplay = forwardRef(({ moveTracks }, ref) => {

    const { zoom } = useContext(ViewsContext)[0]

    const { numBars, currentBar, updateCurrentBar, hasClipboard } = useSequencer()

    const bars = Array.from(Array(numBars).keys())

    const [{ x }, set] = useSpring(() => ({ x: 0}))

    

    const [ isDragging, setIsDragging ] = useState(false)

    // const marqueeRef = useRef()
    const boundaryRef = useRef()

    const calculateCurrentBar = useCallback(
        position => {
          const seg = segmentWidth(boundaryRef)
          const index = Math.round(position / seg)
          const newBarIndex = Math.min(Math.max(index, 0), numBars - 1)
        //   console.log('calculateCurrentBar seg newBarIndex', newBarIndex ) 
          updateCurrentBar(newBarIndex)
        },
        [numBars],
    )

    const boundaries = useCallback(
        (ref) => {
            return ref.current.getBoundingClientRect()
        },
        [],
    )

    const segmentWidth = useCallback(
        (ref) => {
          const { width } = boundaries(ref)
          return width / numBars
        },
        [numBars],
    )

    useEffect(() => {
        const seg = segmentWidth(boundaryRef)
        set( { 
            x: seg * currentBar,
            immediate: true
        })
    }, [currentBar, numBars])


    const bind = useDrag(({ first, last, movement, memo = [x.getValue()] }) => {
        const { width, left, right } = boundaries(boundaryRef)
        if (first) { 
            console.log('drag start')
            // set({
            //     x: 0, // currentBar * seg,
            //     immediate: true
            // })
            setIsDragging(true) 
        }
        if (last) { 
            console.log('drag end')
            setIsDragging(false) 
            calculateCurrentBar(memo[0] + movement[0])
            // set({
            //     x: Math.min(Math.max(memo[0] + movement[0], left), right - (width / numBars * zoom)),
            //     immediate: true
            // })
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
        // transform: isDragging ? x.interpolate(x => `translateX(${x}px)`) : `translateX(${Math.min(currentBar * 100 / zoom, (numBars - zoom) * 100 / zoom)}%)`,
        transform: x.interpolate(x => `translateX(${x}px)`),
        transitionDuration: isDragging ? '0s' : '.15s',
        width: `${100 / numBars * zoom}%`, 
        borderStyle: hasClipboard ? 'dotted' : 'solid',
        borderColor: numBars === zoom ? 'transparent' : vars.greencolor
    }

    // style={{width: `${3 * numBars}%`}}
    // `${3 * zoom}%`

    return (
        <div className={classes.barspane}>
            <animated.div {...bind()} ref={ref} className={classes.marquee} style={style}></animated.div>
            <div ref={boundaryRef} className={classes['bar-display-container']} >                
                {
                    bars.map((b,i) => <div key={i} className={classes['bar-display']} style={{color: i === currentBar ? vars.greencolor : vars.defaultWhite, width: `${100 / numBars}%`}} onClick={() => updateCurrentBar(i)}>{i < numBars ? i+1 : ''}</div>)
                }
            </div>
        </div>
    )
})

export default BarDisplay