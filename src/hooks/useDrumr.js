import axios from 'axios'
import { useContext, useCallback, useEffect } from 'react'
import { DrumrContext } from '../context/DrumrContext'

import useLoadBuffers from '../hooks/useLoadBuffers'
// import * as ACTIONS from '../actions'
import * as TYPES from '../actions/types'

import Track from '../api/Track'
// import { Sample, PannerNode, connectGain, trigger } from '../api/Sample'

// import tracksReducer, { initialState } from '../reducers/tracksReducer'

import { AUDIO_CONTEXT, MIXER } from '../api'

import { magentacolor, purplecolor, orangecolor, cyancolor, neoncolor } from '../scss/_vars.scss'

const DRUM_COLORS = [magentacolor, purplecolor, orangecolor, cyancolor, neoncolor ]
const PATH = 'assets/audio/'

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

  // const loadData = async (url) => {  
  //   dispatch({ type: TYPES.IS_LOADING, value: true })
  //   try {
  //     const response = await axios.get(`./${url}.json`)
  //     // console.log('Success!',response.data.kits);
  //     dispatch({ type: TYPES.DATA_LOADED, value: response.data })
  //   } catch (err) {
  //     dispatch({ type: TYPES.HAS_ERROR, value: err })
  //   }
  // }

  const addTrack = useCallback((id) => {
      const track = new Track(id, DRUM_COLORS[id], AUDIO_CONTEXT, MIXER)
      dispatch({ type: TYPES.ADD_SEQUENCE, value: { trackId:track.id(), numSteps, numBars } })
      dispatch({ type: TYPES.ADD_TRACK, value: { track: track } })
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
  
  const saveData = useCallback(
    ({ kits, verbs }) => {
      console.log('saveData', kits )
      dispatch({ type: TYPES.STORE_KITS, value: kits })
      dispatch({ type: TYPES.STORE_VERBS, value: verbs })
      // loadBuffers(kits[currentKitId])
    }, []
  )

  const setCurrentKitId = useCallback(index => {
    console.log('setCurrentKit', index)
    dispatch({ type: TYPES.UPDATE_KIT_ID, value: index })
  })

  return {
    saveData,
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
