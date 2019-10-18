import React, { useState, useEffect, useContext, useRef  } from 'react'
import PropTypes from 'prop-types'
import { useScroll, useDrag, useWheel, useGesture } from 'react-use-gesture'
import Track from './track'

import classes from './tracks.module.scss'

import { DrumrContext } from '../context/DrumrContext'
import useViews from '../hooks/useSequencer'


const Tracks = () => {

  const {state:{ tracks: { all }, sequencer: { numBars } } } = useContext(DrumrContext)

  const tracksRef = useRef()

  const { zoom, zoomIn, zoomOut } = useViews()

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

  const bind = useScroll(
    ({initial, delta, direction, first, last, movement }) => {
        if (first) {
          console.log('onScroll started', initial) 
        }
        if (last) { 
          console.log('onScroll ended', movement, direction, tracksRef.current.scrollLeft) 
        }
        // console.log('onScroll ev', delta)
    }, 
  //   { domTarget: tracksRef }
  //     // scroll: true,
  //     // wheel: true }
  )

  

  useEffect(() => {
    console.log('[ TRACKS ] tracks INIT')
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
    width: `${100 * (numBars/2) }%`,
  }

  return (
    <div  {...bind()} ref={tracksRef} className={classes.trackspane}>
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