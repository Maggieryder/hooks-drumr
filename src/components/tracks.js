import React, { useState, useEffect, useContext, useRef  } from 'react'
import PropTypes from 'prop-types'
import { useScroll  } from 'react-use-gesture'
import { useSpring, animated } from 'react-spring'
import Track from './track'

import classes from './tracks.module.scss'

import { DrumrContext } from '../context/DrumrContext'
import useViews from '../hooks/useViews'


const Tracks = () => {

  const {state:{ tracks: { all }, sequencer: { numBars } } } = useContext(DrumrContext)

  const tracksRef = useRef()

  const { zoom, trackView } = useViews()

  console.log('[ TRACKS ] tracks zoom', zoom)

  // const [ zoom, setZoom ] = useState(ZOOM_VIEWS[zoomIndex])

  // const bind = useGesture({
    
  //   // onWheel: ({initial, delta, direction, first, last, movement }) => {
  //   //   if (first) {console.log('onWheel started', initial) }
  //   //   if (last) { console.log('onWheel ended', movement, direction) }
  //   //   console.log('onWheel ev', delta)
  //   // },
  //   // onDrag: ({initial, delta, direction, first, last, movement}) => {
  //   //   if (first) {console.log('onDrag started', initial) }
  //   //   if (last) { console.log('onDrag ended', movement, direction) }
  //   //   console.log('onDrag ev', delta)
  //   // },
  //   onScroll: ({initial, delta, direction, first, last, movement }) => {
  //     if (first) {
  //       console.log('onScroll started', initial) 
  //     }
  //     if (last) { 
  //       console.log('onScroll ended', movement, direction, tracksRef.current.scrollLeft) 
  //     }
  //     // console.log('onScroll ev', delta)
  //   },
  //   // onHover: ({xy}) => {
  //   //   console.log('onHover ev', xy)
  //   // },
  // }, 
  // // { domTarget: tracksRef,
  // //   dragDelay: 300,
  // //   drag: true,
  // //   // pinch: true,
  // //   scroll: true,
  // //   wheel: true }
  // // { domTarget: barContainerRef }
  // )
  const axis = React.useRef()
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useScroll(
    ({first, last, direction: [dx, dy], memo = [x.getValue(), y.getValue()] }) => { //movement: [mx, my] , memo = [x.getValue(), y.getValue()]
        if (first) {
          // console.log('onScroll started axis', axis.current) 
        }

        if (!axis.current) {
          if (Math.abs(dx) > Math.abs(dy)) axis.current = 'x'
          else if (Math.abs(dy) > Math.abs(dx)) axis.current = 'y'
        }
        // if (axis.current === 'x') set({ x: memo[0] + mx, immediate: true })
        // else if (axis.current === 'y') set({ y: memo[1] + my, immediate: true })

        
        if (axis.current === 'x' && trackView !== 1) {
          tracksRef.current.style.overflowY= 'hidden'
        } else {
          tracksRef.current.style.overflowX= 'hidden'
        }
        
        // console.log('onScroll axis', axis.current) 
        // if (first) {
        //   console.log('onScroll started', initial) 
        // }
        if (last) {
          axis.current = null
          tracksRef.current.style.overflowX = 'auto'
          tracksRef.current.style.overflowY = 'auto'
        }
        return memo
    }, 
  //   { domTarget: tracksRef }
  //     // scroll: true,
  //     // wheel: true }
  )

  

  useEffect(() => {
    console.log('[ TRACKS ] tracks INIT', zoom)
    return (() => { 
    })
  }, [])

  useEffect(() => {
    console.log('[ TRACKS ] tracks CHANGE', all)
    
    return (() => {
      
    })
  }, [ all ])

  useEffect(() => {
    console.log('[ TRACKS ] zoom', zoom)

  }, [zoom])

  const style = {
    width: `${100 * (numBars/zoom) }%`,
  }

  return (
    <animated.div  {...bind()} ref={tracksRef} className={classes.trackspane}>
      <div className={classes.tracks} style={style}>         
          { all.map((track, i ) => {
            return <Track key={i} track={track} />
          }) }
      </div>
    </animated.div>
  );
}

Tracks.propType = {
  tracks: PropTypes.arrayOf(PropTypes.object)
}

export default React.memo(Tracks)