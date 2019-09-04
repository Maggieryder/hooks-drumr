import axios from 'axios'
import { useContext, useCallback } from 'react'
import { DrumrContext } from '../context/DrumrContext'
// import * as ACTIONS from '../actions'
import * as TYPES from '../actions/types'

import Track from '../api/Track'
// import { Sample, PannerNode, connectGain, trigger } from '../api/Sample'

// import tracksReducer, { initialState } from '../reducers/tracksReducer'

import { AUDIO_CONTEXT, MIXER } from '../api'

// const initialTracksState = {
//   all: [],
//   soloed: [],
//   muted: []
// }

// const tracksReducer = (state, action) => {
//   console.log('tracksReducer action', action)
//   switch (action.type){
//     case 'ADD_TRACK':
//       return {
//         ...state,
//         all: [...state.all, action.value]
//       }
//     default:
//         return state
//   }
  
// }


const useDrumr = () => {
  const {state:{ controller, sequencer, tracks }, dispatch} = useContext(DrumrContext)
  const { numSteps, numBars } = sequencer
  // console.log(tracks)

  const { 
    isLoading,
    error,
    kits,
    verbs,
    kitBuffers,
    verbBuffers,
    currentKitId,
    currentVerbId
     } = controller

  // const [tracks, dispatch] = useReducer(tracksReducer, initialState)

  // console.log('tracks',tracks)

  // const [tracks, dispatch] = useReducer((tracks, { type, value }) => {
  //   switch (type) {
  //     case "addTrack":
  //       return [...tracks, value];
  //     case "removeTrack":
  //       return tracks.filter((_, index) => index !== value);
  //     default:
  //       return tracks;
  //   }
  // }, []);

  const addTrack = useCallback((id) => {
    const track = new Track(id, AUDIO_CONTEXT, MIXER)
    // console.log('addTrack', track)
    // setState(state => ({ 
    //   ...state, 
    //   tracks: [...state.tracks, track] 
    // }))
    
      dispatch({ type: TYPES.ADD_SEQUENCE, value: { trackId:track.id(), numSteps, numBars } })
      dispatch({ type: TYPES.ADD_TRACK, value: { track: track } })
    // console.log(' - - - TRACKS', tracks)
    },
    [ numSteps, numBars ]
  )

  const removeTrack = useCallback((id) => {
      dispatch({ type: TYPES.REMOVE_TRACK, trackId: id })
      dispatch({ type: TYPES.REMOVE_SEQUENCE, trackId: id })
    // console.log(' - - - TRACKS', tracks)
    },
    []
  )

  // const soloTrack = useCallback((id) => {
  //     dispatch({ type: TYPES.SOLO_TRACK, trackId: id })
  //   },
  //   []
  // )

  // const unSoloTrack = useCallback((id) => {
  //     dispatch({ type: TYPES.UNSOLO_TRACK, trackId: id })
  //   },
  //   []
  // )

  const loadData = async (url) => {  
    dispatch({ type: TYPES.IS_LOADING, value: true })
    try {
      const response = await axios.get(`./${url}.json`)
      // console.log('Success!',response.data.kits);
      dispatch({ type: TYPES.DATA_LOADED, value: response.data })
    } catch (err) {
      dispatch({ type: TYPES.HAS_ERROR, value: err })
    }
  }

  const loadBuffer = async (url, callback) => {
    const request = new XMLHttpRequest();
      //header('Access-Control-Allow-Origin: *');
      request.open('get', url, true);
      request.responseType = 'arraybuffer';
      request.onload = function() {
        AUDIO_CONTEXT.decodeAudioData(request.response, function(buffer) {
          callback(buffer);
        },
        function(e){ alert("Error with decoding audio data", e ); });
      };
      request.send();
  }

  const loadBuffers = async (obj, type) => {
    const directory = obj.directory,
    voices = obj.voices
    let buffersToLoad = voices.length,
    buffers = [] 
    // console.log('loadBuffers voices', voices) 
    dispatch({ type: TYPES.IS_LOADING, value: true })
    for (let i = 0;i<voices.length;i++){
      buffers[i] = { label:voices[i].label, buffer:{}, value: voices[i].value }
      loadBuffer('assets/audio/'+ directory + voices[i].smple, (buffer) => {
          //console.log(buffer);
          buffers[i].buffer = buffer
          buffersToLoad --
          // console.log('buffersToLoad', buffersToLoad)
          if (buffersToLoad < 1) {
            const bufferType = type === 'verbBuffers' ? TYPES.UPDATE_VERB_BUFFERS : TYPES.UPDATE_KIT_BUFFERS
            dispatch({ type: bufferType, value: buffers })
          } 
        }
      )
    }
  }

  const setCurrentKitId = index => {
    console.log('setCurrentKit', index)
    dispatch({ type: TYPES.UPDATE_KIT_ID, value: index })
  }

  return {
    loadData,
    loadBuffers,
    setCurrentKitId,
    isLoading,
    error,
    kits,
    verbs,
    kitBuffers,
    verbBuffers,
    currentKitId,
    currentVerbId,
    tracks,
    addTrack,
    removeTrack
  }
}

export default useDrumr;
