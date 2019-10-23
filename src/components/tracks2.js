import React, { useEffect, useContext, forwardRef  } from 'react'
import PropTypes from 'prop-types'

import Track from './track'

import classes from './tracks.module.scss'

import { DrumrContext } from '../context/DrumrContext'
import useSequencer from '../hooks/useSequencer'
import useViews from '../hooks/useViews'

const Tracks = forwardRef((props, ref) => {

  const {state:{ tracks: { all } } } = useContext(DrumrContext)

  const { zoom, trackView } = useViews()

  const { numBars } = useSequencer()


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

//   useEffect(() => {
//     console.log('[ TRACKS ] currentBar', currentBar)
//     const seg = segmentWidth()
//     scrollRef.current.scrollLeft = currentBar * seg
//   }, [currentBar])

  const style = {
    width: `${100 * (numBars/zoom) }%`,
  }

  return (
      <div ref={ref} className={classes.tracks} style={style}>         
          { all.map((track, i ) => {
            return <Track key={i} track={track} />
          }) }
      </div>
  )
})

Tracks.propType = {
  tracks: PropTypes.arrayOf(PropTypes.object)
}

export default React.memo(Tracks)