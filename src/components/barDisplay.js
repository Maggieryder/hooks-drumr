import React, { useContext, useRef } from 'react'
import { useGesture } from 'react-use-gesture'
import { useSpring, animated } from 'react-spring'
// import { DrumrContext } from '../context/DrumrContext'
import useSequencer from '../hooks/useSequencer'

import vars from '../scss/_vars.scss';
import classes from './barDisplay.module.scss'

const BarDisplay = () => {

    const marqueeRef = useRef()
    const boundaryRef = useRef()

    const boundaries = [0 , 2000, 0, 0]

    // const boundaries = boundaryRef.current.getBoundingClientRect()
    // console.log(rect.top, rect.right, rect.bottom, rect.left);

    const [{ x, y, w }, set] = useSpring(() => ({ x: 0, y: 0, w: 50 }))

    const bind = useGesture({

        onDrag: ({ movement, memo = [x.getValue(), y.getValue(), w.getValue()] }) => {
            // if (first) {console.log('onDrag started', initial) }
            // if (last) { console.log('onDrag ended', movement, direction) }
            // console.log('onDrag ev', xy)
            // marqueeRef.current.style.transform = `tranlateX(${delta})`
            // marqueeRef.current.style.left = xy[0]
            // const { width, height, top, right, bottom, left } = boundaryRef.current.getBoundingClientRect()

            const [top, right, bottom, left] = boundaries

            console.log('boundaries', top, right, bottom, left)
            set({
                x: Math.min(Math.max(memo[0] + movement[0], left), right),
                y: Math.min(Math.max(memo[1] + movement[1], top), bottom)
              })
              return memo
          },

          // onHover: ({xy}) => {
          //   console.log('onHover ev', xy)
          // },
        }, 
        { 
            // domTarget: marqueeRef,
            dragDelay: 300,
            drag: true,
          // pinch: true,
        //   scroll: true,
        //   wheel: true 
        }
    )

    // const {state:{ sequencer: { numBars, currentBar }}} = useContext(DrumrContext)

    const { numBars, currentBar, updateCurrentBar } = useSequencer()

    const bars = Array.from(Array(numBars).keys())

    return (
        <div className={classes['bar-display-container']}>
            {/* <div {...bind()} ref={marqueeRef} className={classes.indicator} style={{width: '6%', transform: `translateX(${Math.min(currentBar * 50, (numBars - 2) * 50)}%)`}}></div> */}
            <animated.div {...bind()} className={classes.indicator} style={{x, y, w}}></animated.div>
            {
                bars.map((b,i) => <div key={i} className={classes['bar-display']} style={{color: i === currentBar ? vars.greencolor : vars.defaultWhite}} onClick={() => updateCurrentBar(i)}>{i < numBars ? i+1 : ''}</div>)
            }
        </div>
    )
}

export default BarDisplay