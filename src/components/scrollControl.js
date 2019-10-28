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

    const [{ x }, set] = useSpring(() => ({ x: 0, config: config.gentle }))

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
            draggerRef.current.style.transform = `translateX(${width * perc}px)`
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
            // if (axis.current === 'x') set({ x: memo[0] + mx, immediate: true })
            // else if (axis.current === 'y') set({ y: memo[1] + my, immediate: true })
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
              if (!isPlaying) {
                const newBarIndex = calculatePositionIndex(scrollerRef.current.scrollLeft, scrollerContentRef)
                updateCurrentBar(newBarIndex)
              }
              // const perc = scrollerRef.current.scrollLeft / boundaries(scrollerRef).width
              // moveTo(perc, draggerRef)  
              setIsScrolling(false) 
            } 
            // console.log('scroll', scrollerRef.current.scrollLeft)
            // console.log('width', boundaries(scrollerRef).width)
            if(!isDragging){
              const perc = scrollerRef.current.scrollLeft / boundaries(scrollerRef).width
              moveDraggerTo(perc)
            }
            
            // return memo
        }, 
        { 
          domTarget: scrollerRef,
          event: { passive: false }
        }
      )

      const draggerBind = useDrag(({ first, last, movement, down, velocity, direction, memo = [x.getValue()] }) => { //
        const draggerWidth = boundaries(draggerRef).width
        const boundaryWidth = boundaries(draggerContentRef).width
        const seg = segmentWidth(draggerContentRef)
        const clampedX = clampedResult(memo[0] + movement[0], 0, boundaryWidth - draggerWidth)
        // console.log('direction[0] * velocity', direction[0] * velocity)
        set({
            x: clampedX,
            immediate: down,
            config: { velocity: direction[0] * velocity, decay: true }
        })
        if (first) { 
            console.log('drag start')
            // set({
            //     x: 0, // currentBar * seg,
            //     immediate: true
            // })
            setIsDragging(true) 
        }
        if (last) { 
            console.log('drag end content left', boundaries(draggerRef).left, boundaries(draggerRef).x)
            console.log('drag end new pos', memo[0] + movement[0])
            
            const newBarIndex = calculatePositionIndex(memo[0] + movement[0], draggerContentRef)
            updateCurrentBar(newBarIndex)        
            
            console.log('newBarIndex', newBarIndex)
            
            if(!isScrolling){ 
              const perc = (seg * newBarIndex) / boundaryWidth
              console.log('drag end perc', perc)
              moveScrollerTo(perc)
            }
            const clampedX = clampedResult(seg * newBarIndex, 0, seg * (numBars - zoom))
            set({
                x: clampedX,
                immediate: false,
                config: { velocity: direction[0] * velocity, decay: false }    
            }) 
            setIsDragging(false)      
        }
        return memo
    }, 
    {
        domTarget: draggerRef 
        // dragDelay: true,
        // drag: true, 
    })


    useEffect(() => {      
        const seg = segmentWidth(draggerContentRef)      
        // const clampedX = clampedResult(seg * currentBar, 0, seg * (numBars - zoom))  
        // set( { 
        //     x: clampedX,
        //     immediate: true,
        //     config: { velocity: .05, decay: false }  

        // })
        const boundaryWidth = boundaries(draggerContentRef).width
        const perc = (seg * currentBar) / boundaryWidth
        moveScrollerTo(perc)
    }, [currentBar, numBars, zoom])

    
    useEffect(!isPlaying ? draggerBind : ()=>{}, [draggerBind, isPlaying])

    const marqueeStyle = {
        // transform: isDragging ? x.interpolate(x => `translateX(${x}px)`) : `translateX(${Math.min(currentBar * 100 / zoom, (numBars - zoom) * 100 / zoom)}%)`,
        transform: x.interpolate(x => `translateX(${x}px)`),
        transitionDuration: isDragging ? '0s' : '.15s',
        width: `${100 / numBars * zoom}%`, 
        borderStyle: hasClipboard ? 'dotted' : 'solid',
        borderColor: numBars === zoom ? 'transparent' : vars.greencolor
    }

    return (
        <>
            <div className={classes.dragPane}>
                <animated.div ref={draggerRef} className={classes.marquee} style={marqueeStyle}></animated.div>
                <BarDisplay ref={draggerContentRef} />
            </div>
            <div {...scrollerBind()} ref={scrollerRef} className={classes.scrollPane}>
                <Tracks ref={scrollerContentRef}/>
            </div>
        </>
    )
}

export default ScrollControl

