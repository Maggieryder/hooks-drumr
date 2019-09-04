import React, { useEffect, useContext  } from 'react'
import PropTypes from 'prop-types'
import Track from './track'

import classes from './tracks.module.scss'

import { DrumrContext } from '../context/DrumrContext'

const Tracks = () => {

  const {state:{ tracks: { all } }} = useContext(DrumrContext)

  useEffect(() => {
    console.log('[ TRACKS ] tracks INIT')
    return (() => { 
    })
  }, []);

  useEffect(() => {
    console.log('[ TRACKS ] tracks CHANGE', all)
    return (() => {
      
    })
  }, [ all ]);

  return (
      <div className={classes.tracks}>    
        { all.map((track, i ) => {
            return <Track key={i} track={track} />
          }) }
      </div>
  );
}

Tracks.propType = {
  tracks: PropTypes.arrayOf(PropTypes.object)
}

export default React.memo(Tracks)