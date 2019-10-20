import React, { useState, useEffect, useContext, useRef  } from 'react'
import PropTypes from 'prop-types'
import { useScroll, useGesture  } from 'react-use-gesture'
// import { useSpring, animated } from 'react-spring'
import Track from './track'

import classes from './tracks.module.scss'

import { DrumrContext } from '../context/DrumrContext'
import useViews from '../hooks/useViews'


const Tracks = () => {

  const {state:{ tracks: { all }, sequencer: { numBars } } } = useContext(DrumrContext)

  const { zoom, trackView } = useViews()

  const tracksRef = useRef()
  const axis = React.useRef()
  // const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))

  // const bind = useGesture({
    
  //   onScroll: (
  //       ({event, first, last, direction: [dx, dy] }) => {
  //         if (first) {
  //           console.log('onScroll started event ', event ) 
  //         }     
  //         !last && event.preventDefault()
  //         if (!axis.current) {
  //           if (Math.abs(dx) > Math.abs(dy)) axis.current = 'x'
  //           else if (Math.abs(dy) > Math.abs(dx)) axis.current = 'y'
  //         }
  //         console.log('onScroll moving event ', event ) 
  //         // if (axis.current === 'x') set({ x: memo[0] + mx, immediate: true })
  //         // else if (axis.current === 'y') set({ y: memo[1] + my, immediate: true })
  //         if (axis.current === 'x' && trackView !== 1) {
  //           // tracksRef.current.style.overflowY= 'hidden'
  //         } else {
  //           // tracksRef.current.style.overflowX= 'hidden'
  //         }    
  //         if (last) {
  //           axis.current = null
  //           console.log('onScroll ended event ', event ) 
  //           // tracksRef.current.style.overflowX = 'auto'
  //           // tracksRef.current.style.overflowY = 'auto'
  //         }
  //     }),
  //   },
  //   {
  //     domTarget: tracksRef,
  //     passive: false, capture: true
  //   }
  // )
  const bind = useScroll(
    ({event, first, last, direction: [dx, dy] }) => { //, memo = [x.getValue(), y.getValue()]
      // state => {
        if (first) {
          console.log('onScroll started event ', event ) 
        }     
        !last && event.preventDefault()
        if (!axis.current) {
          if (Math.abs(dx) > Math.abs(dy)) axis.current = 'x'
          else if (Math.abs(dy) > Math.abs(dx)) axis.current = 'y'
        }
        console.log('onScroll moving event ', event ) 
        // if (axis.current === 'x') set({ x: memo[0] + mx, immediate: true })
        // else if (axis.current === 'y') set({ y: memo[1] + my, immediate: true })
        if (axis.current === 'x' && trackView !== 1) {
          // tracksRef.current.style.overflowY= 'hidden'
        } else {
          // tracksRef.current.style.overflowX= 'hidden'
        }    
        if (last) {
          axis.current = null
          console.log('onScroll ended event ', event ) 
          // tracksRef.current.style.overflowX = 'auto'
          // tracksRef.current.style.overflowY = 'auto'
        }
        // return memo
    }, 
    { 
      domTarget: tracksRef,
      // passive: false, capture: true
    }
  )

  useEffect(bind, [bind])

  useEffect(() => {
    console.log('[ TRACKS ] tracks INIT')
    // bind()
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
    <div ref={tracksRef} className={classes.trackspane}>
      <div className={classes.tracks} style={style}>         
          { all.map((track, i ) => {
            return <Track key={i} track={track} />
          }) }
      </div>
    </div>
  );
}

Tracks.propType = {
  tracks: PropTypes.arrayOf(PropTypes.object)
}

export default React.memo(Tracks)