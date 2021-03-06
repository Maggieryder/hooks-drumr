import React, { useEffect, useContext, forwardRef  } from 'react'
import PropTypes from 'prop-types'

import Track from './track'

import classes from './tracks.module.scss'

import { DrumrContext } from '../context/DrumrContext'
import { ViewsContext } from '../context/ViewsContext'

const Tracks = forwardRef((props, ref) => {

  const {state:{ tracks: { all }, sequencer: { numBars }, controller: { kitBuffers } } } = useContext(DrumrContext)
  const { zoom } = useContext(ViewsContext)[0]

  useEffect(() => {
    console.log('[ TRACKS ] tracks INIT')  
    return (() => { 
    })
  }, [])

  useEffect(() => {
    // console.log('[ TRACKS ] tracks numBars zoom CHANGE', all, numBars, zoom)
  }, [ all, numBars, zoom ])

  // if (!kitBuffers || !verbBuffers) return null

  return (
      <div ref={ref} className={classes.tracks} style={{width: `${100 * (numBars/zoom) }%`}}>         
          { kitBuffers && all.map((track, i ) => {
            return <Track key={i} track={track} />
          }) }
      </div>
  )
})

Tracks.propType = {
  tracks: PropTypes.arrayOf(PropTypes.object)
}

export default React.memo(Tracks)