import React, { useEffect  } from 'react'
import PropTypes from 'prop-types'
import Track from './track'

import classes from './tracks.module.scss'

import useDrumr from '../hooks/useDrumr'

const Tracks = () => {

  const { tracks, setTracks } = useDrumr()

  useEffect(() => {
    // setTracks()
    console.log('[ TRACKS ] tracks INIT')
    return (() => { 
    })
  }, []);

  useEffect(() => {
    const { all } = tracks

    console.log('[ TRACKS ] tracks CHANGE ALL', all)

    return (() => {
      
    })
  }, [ tracks ]);

  return (
      <div className={classes.tracks}>    
        { tracks.all.map((track, i ) => {
            return <Track key={i} track={track} />
          }) }
      </div>
  );
}

Tracks.propType = {
  tracks: PropTypes.arrayOf(PropTypes.object)
}

export default Tracks