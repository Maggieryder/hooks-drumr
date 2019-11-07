import React, { useState, useCallback, useEffect, useContext, useRef, useMemo  } from 'react'
import PropTypes from 'prop-types'
import { isFirefox } from "react-device-detect";
import { useScroll, useDrag  } from 'react-use-gesture'
import { useSpring, animated, interpolate, config } from 'react-spring'

import { clamp, boundaries, calculatePositionIndex } from '../utils/calculations.js'

import { ViewsContext } from '../context/ViewsContext'
import useSequencer from '../hooks/useSequencer'

import Tracks from './tracks'
import BarDisplay from './barDisplay'

import vars from '../scss/_vars.scss';
import classes from './scrollControl.module.scss'


const ScrollControl = () => {

    const { zoom, trackView } = useContext(ViewsContext)[0]

    const { numBars, currentBar, updateCurrentBar, isPlaying, hasClipboard } = useSequencer()

    const axis = useRef()
    const scrollerRef = useRef()
    const scrollerContentRef = useRef()
    const draggerRef = useRef()

    const [ isDragging, setIsDragging ] = useState(false)
    const [ userScroll, setUserScroll ] = useState(false)
    const [ isUpdating, setIsUpdating ] = useState(false)

    const [{ dragX, scrollX }, set] = useSpring(() => ({ dragX: 0, scrollX: 0, config: config.gentle }))

    const segmentWidth = useCallback(
        (ref) => {
          const { width } = boundaries(ref.current)
          return width / numBars
        },
        [numBars]
    )

    const moveDragAndScroll = useCallback(
      (pos, controller, down, v, releaseDelay = false) => {
        const scrollableAreaWidth = boundaries(scrollerRef.current).width
        const draggerWidth = boundaries(draggerRef.current).width
        const scrollableContentWidth = boundaries(scrollerContentRef.current).width
        const maxDragRight = scrollableAreaWidth - draggerWidth
        const maxScrollRight = scrollableContentWidth - scrollableAreaWidth    
        if (!isPlaying) {

          let newBarIndex

          if (controller === 'drag') { 
            const clampedDragX = clamp(pos, 0, maxDragRight)
            const draggerSegment = segmentWidth(scrollerRef)
            const scrollerSegment = segmentWidth(scrollerContentRef) 
            newBarIndex = calculatePositionIndex(pos, draggerSegment)
            const restingDragX = clamp(draggerSegment * newBarIndex, 0, maxDragRight)
            const restingScrollX = clamp(scrollerSegment * newBarIndex, 0, maxScrollRight)
            // console.log('dragging pos clamped', pos, clampedDragX)
            console.log('dragging newBarIndex, restingDragX', newBarIndex, restingDragX)
            const dragPosition = down ? clampedDragX : restingDragX
            const dragPercentage = dragPosition / scrollableAreaWidth
            console.log('dragPercentage', dragPercentage)
            // console.log('DOWN', down)
            if(down){  
              set({
                dragX: dragPosition,
                scrollX: scrollableContentWidth * dragPercentage,
                immediate: down,
                config: { velocity: v, decay: down }
              })
            } else {
              console.log('HERE')
              // setUserScroll(false) 
              if (currentBar !== newBarIndex) updateCurrentBar(newBarIndex)
              set({
                dragX: dragPosition,
                scrollX: restingScrollX,
                immediate: down,
                config: { velocity: v, decay: down }
              })
            }
          } else if (controller === 'scroll'){ 
            if (!isDragging && !isUpdating){
              setUserScroll(true)
              const clampedScrollX = clamp(pos, 0, maxScrollRight)
              const scrollerSegment = segmentWidth(scrollerContentRef)
              newBarIndex = calculatePositionIndex(pos, scrollerSegment)
              // const restingScrollX = clamp(scrollerSegment * newBarIndex, 0, maxScrollRight)
              // const scrollPosition = down ? clampedScrollX : restingScrollX
              const scrollPercentage = clampedScrollX / scrollableAreaWidth
              console.log('############# scrolling pos', pos)
              console.log('############# scrolling newBarIndex', newBarIndex)
              console.log('############# scrolling scrollPercentage', scrollPercentage)
              // if(!down && !releaseDelay){ 
              // if (currentBar !== newBarIndex) updateCurrentBar(newBarIndex)
              // set({
              //   // dragX: Math.min(draggerWidth * scrollPercentage, maxDragRight),
              //   scrollX: clampedScrollX,
              //   immediate: true,
              //   config: { velocity: v, decay: true }
              // })
              // }
            }
          }
        } 
      },
      [isDragging, currentBar, isPlaying, isUpdating],
    )

    useEffect(() => {
        // console.log('currentBar change', currentBar)
        // console.log('isDragging', isDragging)
        // console.log('userScroll', userScroll)
        let updateID 
        if (!isDragging && !userScroll) {
          scrollerRef.current.style.scrollBehavior = 'smooth'
          setIsUpdating(true)
          const scrollableAreaWidth = boundaries(scrollerRef.current).width
          const scrollableContentWidth = boundaries(scrollerContentRef.current).width
          const draggerWidth = boundaries(draggerRef.current).width
          const scrollerSegment = segmentWidth(scrollerContentRef)
          const draggerSegment = segmentWidth(scrollerRef)
          set({
            dragX: Math.min(draggerSegment * currentBar, scrollableAreaWidth - draggerWidth),
            scrollX: Math.min(scrollerSegment * currentBar, scrollableContentWidth - scrollableAreaWidth),
            immediate: true,
            config: { velocity: 0, decay: true }
          })
          updateID = setTimeout(() => {
            console.log('CLEAR updateID timeout', updateID)
            scrollerRef.current.style.scrollBehavior = 'auto'
            setIsUpdating(false)
            updateID = null
          }, 500) 
        }
        return (() => {
          console.log('UNBIND updateID timeout', updateID)
          scrollerRef.current.style.scrollBehavior = 'auto'
          setIsUpdating(false)
          if (updateID) clearTimeout(updateID)
        })    
    }, [currentBar, isDragging, userScroll, setIsUpdating])

    useEffect(() => {
      // console.log('[ SCROLL_CONTROLL ] isPlaying', isPlaying )
      scrollerRef.current.style.overflowX = isPlaying ? 'hidden' : 'auto' 
      // scrollerRef.current.style.scrollBehavior = isUpdating ? 'smooth' : 'auto'
    }, [ isPlaying ])

    const scrollerBind = useScroll(
        ({event, first, last, movement, down, velocity, direction: [dx, dy], memo = [scrollX.getValue()] }) => { 
            if (first) {
              console.log('onScroll started memo', memo[0] ) 
              // setUserScroll(true)
            } 
            const pos = memo[0] + movement[0]
            const v = dx * velocity
            if (event && event.gesture) moveDragAndScroll(pos, event.gesture, true, v)    
            !last && event.preventDefault()
            if (!axis.current) {
              if (Math.abs(dx) > Math.abs(dy)) axis.current = 'x'
              else if (Math.abs(dy) > Math.abs(dx)) axis.current = 'y'
            }
            // if (axis.current === 'x') set({ dragX: memo[0] + movement[0], immediate: true })
            // else if (axis.current === 'y') set({ draggerY: memo[1] + movement[1], immediate: true })
            if (!isFirefox) {
              // if (axis.current === 'x' && trackView !== 1) {
              if (axis.current === 'x') {
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
              console.log('onScroll ENDED memo', memo[0] )
              // setUserScroll(false)
              setTimeout(()=> setUserScroll(false), 1000) 
            } 
            return memo
        }, 
        { 
          domTarget: scrollerRef,
          event: { passive: false }
        }
    )

    const draggerBind = useDrag(
      ({ event, first, last, movement, down, velocity, direction, memo = [dragX.getValue()] }) => {
          const pos = memo[0] + movement[0]
          const v = direction[0] * velocity
          moveDragAndScroll(pos, event.gesture, down, v, true)
          // console.log('onDrag event', event.gesture)
          if (first) { 
              console.log('drag start memo', memo[0])
              setIsDragging(true) 
          }
          if (last) { 
              console.log('onDrag end memo', memo[0])
              setTimeout(()=> setIsDragging(false), 1000)                 
          }
          return memo
        }, 
        {
          domTarget: draggerRef 
          // dragDelay: true,
          // drag: true, 
        }
    )

    useEffect(draggerBind, [draggerBind])

    useEffect(scrollerBind, [scrollerBind])

    const marqueeStyle = {
        transform: dragX.interpolate(dragX => `translateX(${dragX}px)`),
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
                <BarDisplay/>
            </div>
            <animated.div ref={scrollerRef} className={classes.scrollPane} scrollLeft={scrollX} >
                <Tracks ref={scrollerContentRef} />
            </animated.div>
        </>
    )
}

export default ScrollControl

/* {...scrollerBind()}  */

