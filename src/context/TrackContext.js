import React, { useState } from 'react'

const initialState = {
  trackId: null,
  color: null,
  context: null,
  buffer: null,
  voiceId: 0,
  gain: 0,
  pan: 0,
  reverbSend: 0,
  delaySend: 0,
  solo: false,
  mute: false,
  isInPlay: false
};

const TrackContext =  React.createContext([{}, () => {}])

const TrackProvider = (props) => {
  const [state, setState] = useState(initialState);
  return (
    <TrackContext.Provider value={[state, setState]}>
      {props.children}
    </TrackContext.Provider>
  );
};

export { TrackContext, TrackProvider };