import React from 'react'
import PropTypes from 'prop-types'
import Bars from './bars'
import Controls from './controls'

import { TrackProvider } from "../context/TrackContext";
import useViews from '../hooks/useViews'

import classes from './track.module.scss'

const Track = ( { track } ) => {
  const { trackView } = useViews()
  return (
    <TrackProvider>
      <div className={classes.track}>
        <div className={classes['bars-mask']} style={{height: trackView !== 1 ? '50px' : 0 }}>
          <Bars track={track}/>
        </div>
        <div className={classes['controls-mask']} style={{height: trackView !== 2 ? '60px' : 0 }}>
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