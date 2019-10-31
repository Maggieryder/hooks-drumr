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
    const [ isScrolling, setIsScrolling ] = useState(false)

    const [{ dragX, scrollX }, set] = useSpring(() => ({ dragX: 0, scrollX: 0, config: config.gentle }))

    const segmentWidth = useCallback(
        (ref) => {
          const { width } = boundaries(ref.current)
          return width / numBars
        },
        [numBars]
    )

    const moveDragAndScroll = useCallback(
      (pos, controller, down, v) => {    
        if (!isPlaying) {
          const scrollableAreaWidth = boundaries(scrollerRef.current).width  
          const scrollableContentWidth = boundaries(scrollerContentRef.current).width
          const draggerWidth = boundaries(draggerRef.current).width
          
          const maxDragRight = scrollableAreaWidth - draggerWidth
          const maxScrollRight = scrollableContentWidth - scrollableAreaWidth

          let newBarIndex

          if (controller === 'drag') { 
            const clampedDragX = clamp(pos, 0, maxDragRight)
            const draggerSegment = segmentWidth(scrollerRef) 
            newBarIndex = calculatePositionIndex(pos, draggerSegment)
            const restingDragX = clamp(draggerSegment * newBarIndex, 0, maxDragRight)
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
              // setIsScrolling(false) 
              if (currentBar !== newBarIndex) updateCurrentBar(newBarIndex)
              set({
                dragX: dragPosition,
                // scrollX: restingScrollX,
                immediate: down,
                config: { velocity: v, decay: down }
              })
            }
          } else if (controller === 'scroll'){ 
            if (!isDragging && isScrolling){
              console.log('scrolling pos', pos)
              const clampedScrollX = clamp(pos, 0, maxScrollRight)
              const scrollerSegment = segmentWidth(scrollerContentRef)
              newBarIndex = calculatePositionIndex(pos, scrollerSegment)
              // const restingScrollX = clamp(scrollerSegment * newBarIndex, 0, maxScrollRight)
              console.log('scrolling newBarIndex', newBarIndex,)
            // const scrollPosition = down ? clampedScrollX : restingScrollX
            // const scrollPercentage = scrollPosition / scrollableAreaWidth
              const scrollPercentage = clampedScrollX / scrollableAreaWidth
              if(!down){ 
                if (currentBar !== newBarIndex) updateCurrentBar(newBarIndex)
                set({
                  dragX: Math.min(draggerWidth * scrollPercentage, maxDragRight),
                  scrollX: clampedScrollX,
                  immediate: true,
                  config: { velocity: v, decay: true }
                })
              }
            }
          }
        }
      },
      [isDragging, isScrolling, currentBar, isPlaying],
    )

    const scrollerBind = useScroll(
        ({event, first, last, movement, down, velocity, direction: [dx, dy], memo = [scrollX.getValue()] }) => { 
            if (first) {
              console.log('onScroll started event', event ) 
              setIsScrolling(true)
            } 
            const pos = memo[0] + movement[0]
            const v = dx * velocity
            if (event && event.gesture) moveDragAndScroll(pos, event.gesture, false, v)    
            !last && event.preventDefault()
            if (!axis.current) {
              if (Math.abs(dx) > Math.abs(dy)) axis.current = 'x'
              else if (Math.abs(dy) > Math.abs(dx)) axis.current = 'y'
            }
            // if (axis.current === 'x') set({ dragX: memo[0] + mx, immediate: true })
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
              console.log('onScroll ENDED event', event )
              setIsScrolling(false)  
            } 
            return memo
        }, 
        { 
          domTarget: scrollerRef,
          event: { passive: false }
        }
    )

    const draggerBind = useDrag(({ event, first, last, movement, down, velocity, direction, memo = [dragX.getValue()] }) => {
          const pos = memo[0] + movement[0]
          const v = direction[0] * velocity
          moveDragAndScroll(pos, event.gesture, down, v)
          // console.log('onDrag event', event.gesture)
          if (first) { 
              console.log('drag start')
              setIsDragging(true) 
          }
          if (last) { 
              console.log('onDrag event', event.gesture)
              setIsDragging(false)                  
          }
          return memo
      }, 
      {
          domTarget: draggerRef 
          // dragDelay: true,
          // drag: true, 
      }
    )


    useEffect(() => {
      console.log('currentBar change', currentBar)
      console.log('isDragging isScrolling', isDragging, isScrolling)
        scrollerRef.current.style.overflowX = (isPlaying) ? 'hidden' : 'auto'  
        if (!isDragging && !isScrolling) {
          scrollerRef.current.style.scrollBehavior = (isPlaying) ? 'smooth' : 'auto'
          const scrollableAreaWidth = boundaries(scrollerRef.current).width
          const draggerWidth = boundaries(draggerRef.current).width
          const scrollerSegment = segmentWidth(scrollerContentRef)
          const scrollPercentage = (scrollerSegment * currentBar) / scrollableAreaWidth 
          set({
            dragX: Math.min(draggerWidth * scrollPercentage,scrollableAreaWidth - draggerWidth),
            scrollX: scrollerSegment * currentBar,
            immediate: true,
            config: { velocity: 0.15, decay: true }
          })
        }     
    }, [currentBar, isPlaying, isDragging, isScrolling])

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

