import React, { useLayoutEffect, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
// import { useSpring, animated, interpolate , config } from 'react-spring'
// import useMeasure from 'use-measure';

import Bars from './bars'
import Controls from './controls'

import { TrackProvider } from "../context/TrackContext"
import { ViewsContext } from '../context/ViewsContext'
// import useViews from '../hooks/useViews'

import classes from './track.module.scss'

const Track = ({ track }) => {
  
  const { trackView } = useContext(ViewsContext)[0]

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