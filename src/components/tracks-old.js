import React, { useCallback, useEffect, useContext, useRef, forwardRef  } from 'react'
import PropTypes from 'prop-types'
import { isFirefox } from "react-device-detect";
import { useScroll, useGesture  } from 'react-use-gesture'
// import { useSpring, animated } from 'react-spring'
import Track from './track'

import classes from './tracks.module.scss'

import { DrumrContext } from '../context/DrumrContext'
import useSequencer from '../hooks/useSequencer'
import useViews from '../hooks/useViews'


const Tracks = forwardRef(({ moveMarquee }, ref ) => {

  const {state:{ tracks: { all } } } = useContext(DrumrContext)

  const { numBars, currentBar, updateCurrentBar, isPlaying } = useSequencer()

  const { zoom, trackView } = useViews()

  const scrollRef = useRef()
  const tracksRef = useRef()
  const axis = useRef()


  const boundaries = useCallback(
    (ref) => {
      return ref.current.getBoundingClientRect()
    },
    [],
  )

  const calculateCurrentBar = useCallback(
    forward => {
      const seg = segmentWidth()
      // const index = forward ? Math.round(scrollRef.current.scrollLeft / seg) : Math.round(scrollRef.current.scrollLeft / seg)
      const index = Math.round(scrollRef.current.scrollLeft / seg)
      const newBarIndex = Math.min(Math.max(index, 0), numBars - 1)
      console.log('calculateCurrentBar seg newBarIndex', newBarIndex ) 
      updateCurrentBar(newBarIndex)
    },
    [numBars, zoom],
  )

  const segmentWidth = useCallback(
    () => {
      const { width } = boundaries(tracksRef)
      return width / numBars
    },
    [numBars],
  )
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
  //           // scrollRef.current.style.overflowY= 'hidden'
  //         } else {
  //           // scrollRef.current.style.overflowX= 'hidden'
  //         }    
  //         if (last) {
  //           axis.current = null
  //           console.log('onScroll ended event ', event ) 
  //           // scrollRef.current.style.overflowX = 'auto'
  //           // scrollRef.current.style.overflowY = 'auto'
  //         }
  //     }),
  //   },
  //   {
  //     domTarget: scrollRef,
  //     passive: false, capture: true
  //   }
  // )
  const bind = useScroll(
    ({event, first, last, initial:[ix, iy], direction: [dx, dy] }) => { //, memo = [x.getValue(), y.getValue()]
      // state => {
        if (first) {
          // console.log('onScroll started isFirefox ', isFirefox ) 
        }     
        !last && event.preventDefault()
        if (!axis.current) {
          if (Math.abs(dx) > Math.abs(dy)) axis.current = 'x'
          else if (Math.abs(dy) > Math.abs(dx)) axis.current = 'y'
        }
        // console.log('onScroll moving event ', event ) 
        // if (axis.current === 'x') set({ x: memo[0] + mx, immediate: true })
        // else if (axis.current === 'y') set({ y: memo[1] + my, immediate: true })
        if (!isFirefox) {
          if (axis.current === 'x' && trackView !== 1) {
            scrollRef.current.style.overflowY= 'hidden'
          } else {
            scrollRef.current.style.overflowX= 'hidden'
          } 
        }   
        if (last) {
          if (!isFirefox) {
            axis.current = null
            scrollRef.current.style.overflowX = 'auto'
            scrollRef.current.style.overflowY = 'auto'
          }
          console.log('onScroll ended event scrollRef.current.scrollLeft', scrollRef.current.scrollLeft)
          if (!isPlaying) {
            calculateCurrentBar(dx > ix)
          }
          // const perc = scrollRef.current.scrollLeft / boundaries(scrollRef).width
          // moveMarquee(perc)

        } 
        // console.log('scroll', scrollRef.current.scrollLeft)
        // console.log('width', boundaries(scrollRef).width)
        const perc = scrollRef.current.scrollLeft / boundaries(scrollRef).width
        moveMarquee(perc)
        // return memo
    }, 
    { 
      domTarget: scrollRef,
      event: { passive: false }
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
    console.log('[ TRACKS ] currentBar', currentBar)
    const seg = segmentWidth()
    scrollRef.current.scrollLeft = currentBar * seg
  }, [currentBar])

  const style = {
    width: `${100 * (numBars/zoom) }%`,
  }

  return (
    <div ref={scrollRef} className={classes.trackspane}>
      <div ref={tracksRef} className={classes.tracks} style={style}>         
          { all.map((track, i ) => {
            return <Track key={i} track={track} />
          }) }
      </div>
    </div>
  );
})

Tracks.propType = {
  tracks: PropTypes.arrayOf(PropTypes.object)
}

export default React.memo(Tracks)