import React from 'react'
import PropTypes from 'prop-types'
import Bars from './bars'
import Controls from './controls'

import { TrackProvider } from "../context/TrackContext";

import classes from './track.module.scss'

const Track = ( { track } ) => {

  return (
    <TrackProvider>
      <div className={classes.track}>
        <div className={classes['bars-mask']}>
          <Bars track={track}/>
        </div>
        <div className={classes['controls-mask']}>
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