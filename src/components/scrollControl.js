import React, { useState, useCallback, useEffect, useContext, useRef  } from 'react'
import PropTypes from 'prop-types'
import { isFirefox } from "react-device-detect";
import { useScroll, useDrag  } from 'react-use-gesture'
import { useSpring, animated, interpolate, config } from 'react-spring'

// import { ViewsContext } from '../context/ViewsContext'
import useSequencer from '../hooks/useSequencer'
import useViews from '../hooks/useViews'

import Tracks from './tracks'
import BarDisplay from './barDisplay'

import vars from '../scss/_vars.scss';
import classes from './scrollControl.module.scss'


const ScrollControl = () => {

    // const {state: { zoom, trackView } } = useContext(ViewsContext)

    const { numBars, currentBar, updateCurrentBar, isPlaying, hasClipboard } = useSequencer()

    const { zoom, trackView } = useViews()

    const axis = useRef()
    const scrollerRef = useRef()
    const scrollerContentRef = useRef()
    const draggerRef = useRef()
    const draggerContentRef = useRef()

    const [ isDragging, setIsDragging ] = useState(false)
    const [ isScrolling, setIsScrolling ] = useState(false)

    const [{ draggerX }, set] = useSpring(() => ({ draggerX: 0, config: config.gentle }))

    const boundaries = useCallback(
        ref => {
          return ref.current.getBoundingClientRect()
        },
        []
    )

    const clampedResult = useCallback(
      (n, min, max) => {
        return Math.min(Math.max(n, min), max)
      },
      []
    )

    const segmentWidth = useCallback(
        (ref) => {
          const { width } = boundaries(ref)
          return width / numBars
        },
        [numBars]
    )

    const calculatePositionIndex = useCallback(
        (position, ref) => {
          const seg = segmentWidth(ref)
          const index = Math.round(position / seg)
          const clampedIndex = clampedResult(index, 0, numBars - 2)
          return clampedIndex
        },
        [numBars]
    )

    const moveDraggerTo = useCallback(
        (perc) => {
            const { width } =  boundaries(draggerRef)
            const boundaryWidth = boundaries(draggerContentRef).width
            setDraggerPosition(width * perc, 0, boundaryWidth, true, 0 )
        },
        []
    )

    const moveScrollerTo = useCallback(
        (perc) => {
            const { width } =  boundaries(scrollerContentRef)
            scrollerRef.current.scrollLeft = Math.min(width * perc, width)
        },
        []
    )

    const scrollerBind = useScroll(
        ({event, first, last, direction: [dx, dy] }) => { // initial:[ix, iy], memo = [x.getValue(), y.getValue()]
          if (!isPlaying) {
            if (first) {
              // console.log('onScroll started isFirefox ', isFirefox ) 
              setIsScrolling(true)
            }     
            !last && event.preventDefault()
            if (!axis.current) {
              if (Math.abs(dx) > Math.abs(dy)) axis.current = 'x'
              else if (Math.abs(dy) > Math.abs(dx)) axis.current = 'y'
            }
            // console.log('onScroll moving event ', event ) 
            // if (axis.current === 'x') set({ draggerX: memo[0] + mx, immediate: true })
            // else if (axis.current === 'y') set({ draggerY: memo[1] + my, immediate: true })
            if (!isFirefox) {
              if (axis.current === 'x' && trackView !== 1) {
                scrollerRef.current.style.overflowY= 'hidden'
              } else {
                scrollerRef.current.style.overflowX= 'hidden'
              } 
            }   
            if (last) {
              
              if (!isFirefox) {
                axis.current = null
                scrollerRef.current.style.overflowX = 'auto'
                scrollerRef.current.style.overflowY = 'auto'
              }
              console.log('onScroll ended event scrollerRef.current.scrollLeft', scrollerRef.current.scrollLeft)
              const newBarIndex = calculatePositionIndex(scrollerRef.current.scrollLeft, scrollerContentRef)
              updateCurrentBar(newBarIndex)
              // const perc = scrollerRef.current.scrollLeft / boundaries(scrollerRef).width
           
              setIsScrolling(false) 
            } 
            // console.log('scroll', scrollerRef.current.scrollLeft)
            // console.log('width', boundaries(scrollerRef).width)
            if(!isDragging){
              const { width } = boundaries(scrollerRef)
              const perc = scrollerRef.current.scrollLeft / width
              moveDraggerTo(perc)
            }
            // return memo
          } 
        }, 
        { 
          domTarget: scrollerRef,
          event: { passive: false }
        }
      )

      const setDraggerPosition = useCallback(
        (position, min, max, down, velocity) => {
          const draggerWidth = boundaries(draggerRef).width
          const clampedX = clampedResult(position, min, max - draggerWidth)
          set({
            draggerX: clampedX,
            immediate: down,
            config: { velocity: velocity, decay: down }
          })
        }, []
      )

      const draggerBind = useDrag(({ first, last, movement, down, velocity, direction, memo = [draggerX.getValue()] }) => {
        if (!isPlaying) {
          const boundaryWidth = boundaries(draggerContentRef).width
          const seg = segmentWidth(draggerContentRef)
          const pos = memo[0] + movement[0]
          const v = direction[0] * velocity
          setDraggerPosition(pos, 0, boundaryWidth, down, v )
          if (first) { 
              console.log('drag start')
              setIsDragging(true) 
          }
          if (last) { 
              // console.log('drag end new pos', memo[0] + movement[0]) 
              const newBarIndex = calculatePositionIndex(pos, draggerContentRef)
              // updateCurrentBar(newBarIndex)        
              console.log('drag end newBarIndex', newBarIndex) 
              if(!isScrolling){ 
                const perc = (seg * newBarIndex) / boundaryWidth
                console.log('drag end perc', perc)
                moveScrollerTo(perc)
              }
              // setDraggerPosition(seg * newBarIndex, 0, boundaryWidth, down, v )
              setIsDragging(false)      
          }
          return memo
        }
    }, 
    {
        domTarget: draggerRef 
        // dragDelay: true,
        // drag: true, 
    })


    useEffect(() => {
        scrollerRef.current.style.overflowX = (isPlaying) ? 'hidden' : 'auto'  
        if (!isDragging && !isScrolling) {
          const boundaryWidth = boundaries(draggerContentRef).width
          const seg = segmentWidth(draggerContentRef) 
          const perc = (seg * currentBar) / boundaryWidth 
          if (isPlaying) setDraggerPosition(seg * currentBar, 0, boundaryWidth, false, .25 )
          moveScrollerTo(perc) 
        }     
    }, [currentBar, isPlaying])

    // useEffect(() => {      
    //   scrollerRef.current.style.overflowX = (isPlaying) ? 'hidden' : 'auto'
    // }, [isPlaying])

    // useEffect(() => {
    //   console.log('ScrollControl isPlaying', isPlaying)
    //   if (isPlaying) {
    //     scrollerRef.current.style.overflowX= 'hidden'
    //   } else {
    //     draggerBind()
    //     scrollerBind()
    //   }
    // },[draggerBind, scrollerBind, isPlaying])

    useEffect(draggerBind, [draggerBind])

    useEffect(scrollerBind, [scrollerBind])

    const marqueeStyle = {
        // transform: isDragging ? x.interpolate(x => `translateX(${x}px)`) : `translateX(${Math.min(currentBar * 100 / zoom, (numBars - zoom) * 100 / zoom)}%)`,
        transform: draggerX.interpolate(x => `translateX(${x}px)`),
        transitionDuration: isDragging ? '0s' : '.15s',
        width: `${100 / numBars * zoom}%`, 
        borderStyle: hasClipboard ? 'dotted' : 'solid',
        borderColor: numBars === zoom ? 'transparent' : vars.greencolor,
        cursor: isPlaying ? 'default' : 'grab'
    }

    return (
        <>
            <div className={classes.dragPane}>
                <animated.div ref={draggerRef} className={classes.marquee} style={marqueeStyle}></animated.div>
                <BarDisplay ref={draggerContentRef} />
            </div>
            <div ref={scrollerRef} className={classes.scrollPane}>
                <Tracks ref={scrollerContentRef}/>
            </div>
        </>
    )
}

export default ScrollControl

/* {...scrollerBind()}  */