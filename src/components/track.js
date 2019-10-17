import React, { useContext, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated, interpolate , config } from 'react-spring'
import { useScroll, useDrag, useWheel, useGesture } from 'react-use-gesture'

import Bars from './bars'
import Controls from './controls'

import { TrackProvider } from "../context/TrackContext"
import { ViewsContext } from '../context/ViewsContext'
// import useViews from '../hooks/useViews'

import classes from './track.module.scss'

const Track = ({ track }) => {
  
  const { trackView } = useContext(ViewsContext)[0]

  const barContainerRef = useRef()

  const bind = useGesture({
    // onWheel: ({initial, delta, direction, first, last, movement }) => {
    //   if (first) {console.log('onWheel started', initial) }
    //   if (last) { console.log('onWheel ended', movement, direction) }
    //   console.log('onWheel ev', delta)
    // },
    // onDrag: ({initial, delta, direction, first, last, movement}) => {
    //   if (first) {console.log('onDrag started', initial) }
    //   if (last) { console.log('onDrag ended', movement, direction) }
    //   console.log('onDrag ev', delta)
    // },
    onScroll: ({initial, delta, direction, first, last, movement }) => {
      if (first) {console.log('onScroll started', initial) }
      if (last) { 
        console.log('onScroll ended', movement, direction, barContainerRef.current.className) 
        let allBarContainers = [...document.getElementsByClassName(`${barContainerRef.current.className}`)] //document.getElementsByClassName(`${barContainerRef.current.className}`)
        allBarContainers.map(container => {
          console.log('container.firstChild', container.firstChild)
          if (container !== barContainerRef.current){
            container.scrollTo(initial + movement, 0)
          }
          
        })
        
      }
      console.log('onScroll ev', delta)
    },
    // onHover: ({xy}) => {
    //   console.log('onHover ev', xy)
    // },
  }, 
  // { domTarget: barsRef,
  //   dragDelay: 300,
  //   drag: true,
  //   // pinch: true,
  //   scroll: true,
  //   wheel: true }
  // { domTarget: barContainerRef }
  )
  

  // const barsRef = useRef()
  // const controlsRef = useRef()
  // const barsHeight = useMeasure(barsRef).height
  // const controlsHeight = useMeasure(controlsRef).height
  // const myConfig = { mass: .5, tension: 120, friction: 14, velocity: 0, precision: 0.01 }


  // useLayoutEffect(()=> {
  //   // console.log('useMeasure(barsRef)',barsHeight)
  //   return (() => { 
  //   })
  // },[trackView])

  // const barprops = useSpring({height: trackView !== 1 ? 50 : 0 , from: {height: trackView === 1 ? 0 : 50  }, config: myConfig})
  // const controlsprops = useSpring({height: trackView !== 2 ? 60 : 0 , from: {height: trackView === 2 ? 0 : 60 }, config: myConfig})
  


  return (
    <TrackProvider>
      <div className={classes.track}>
        <div 
          {...bind()} 
          ref={barContainerRef}
          className={classes['bars-mask']} 
          style={{height: trackView !== 1 ? '50px' : 0}}>
          <Bars track={track}/>
        </div>
        <div 
          className={classes['controls-mask']} 
          style={{height: trackView !== 2 ? '60px' : 0}}>
          <Controls track={track} />  
        </div>
      </div>
    </TrackProvider>
  );
}

Track.propTypes = {
  track: PropTypes.object.isRequired
}

export default React.memo(Track)