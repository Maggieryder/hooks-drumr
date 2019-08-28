import React, { useReducer } from 'react'

import rootReducer from '../reducers'

// import tracksReducer from '../reducers/tracksReducer'

const initialState = {
  isLoading: false,
  error: null,
  kits: null,
  verbs: null,
  kitBuffers: [{ label: '...', value: '0'}],
  verbBuffers: null,
  currentKitId: 1,
  currentVerbId: 0 
}

const initialSequencerState = {
  isPlaying: false,
  tempo: 96,
  swing: 0,
  numBars: 1,
  numBeats: 4,
  numSteps: 16,
  sequences: [],
  currentBar: 0,
  currentStep: 0
}

// sequences: { // as objects
//  '0': [
//        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
//       ],
//  '1': [
//        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
//       ],
//  '2'; [
//        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
//       ]
//}

const initialTracksState = {
  all: [],
  soloed: [],
  muted: []
}

const rootState = {
  controller: initialState,
  sequencer: initialSequencerState,
  tracks: initialTracksState
}

const DrumrContext =  React.createContext([{}, () => {}])

const DrumrProvider = (props) => {
  // const [state, setState] = useState(initialState);
  const [state, dispatch] = useReducer(rootReducer, rootState)
  return (
    <DrumrContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DrumrContext.Provider>
  );
};

export { DrumrContext, DrumrProvider };
