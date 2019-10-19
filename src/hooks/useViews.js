import { useContext, useCallback } from 'react'
import { ViewsContext } from '../context/ViewsContext'

const TRACK_VIEWS = ['settings', 'steps', 'both']
// const ZOOM_VIEWS = [4, 2]

const useViews = () => {

    const [state, setState] = useContext(ViewsContext)

    const {
        trackView,
        // zoomIndex, 
        zoom
        // viewTrackSteps,
        // editTrackStepsArray
    } = state

    const toggleTrackView = useCallback(
        () => {
          // console.log('[useViews] setViewTrackSettings', trackView)
          const nextView = (trackView + 1) < TRACK_VIEWS.length ? trackView + 1 : 0;
          setState(state => ({ 
            ...state, 
            trackView: nextView
          }))
        },
        [trackView]
    )

    const toggleZoom = useCallback(
      () => {
        setState(state => ({ 
          ...state,
          zoom: state.zoom === 2 ? 4 : 2
        }))
      }
    )

  //   const zoomIn = useCallback(
  //       () => {
  //         const nextIndex = (zoomIndex + 1) < ZOOM_VIEWS.length ? zoomIndex + 1 : zoomIndex
  //         console.log('[useViews] zoomIn', nextIndex)
  //         setState(state => ({ 
  //           ...state,
  //           zoomIndex: nextIndex,
  //           zoom: ZOOM_VIEWS[nextIndex]
  //         }))
  //       },
  //       [zoomIndex]
  //   )

  //   const zoomOut = useCallback(
  //     () => {
  //       const nextIndex = (zoomIndex - 1) > 0 ? zoomIndex - 1 : 0
  //       console.log('[useViews] zoomOut', nextIndex)
  //       setState(state => ({ 
  //         ...state,
  //         zoomIndex: nextIndex,
  //         zoom: ZOOM_VIEWS[nextIndex]
  //       }))
  //     },
  //     [zoomIndex]
  // )

    // const toggleViewTrackSteps = useCallback(
    //     () => {
    //       console.log('[useViews] setViewTrackSteps')
    //       setState(state => ({ 
    //         ...state, 
    //         viewTrackSteps: !viewTrackSteps 
    //       }))
    //     },
    //     [viewTrackSteps]
    // )

    // const setEditTrackStepsArray = useCallback(
    //     ({ trackId  }) => {
    //       console.log('[useViews] setEditTrackStepsArray')
    //       setState(state => ({ 
    //         ...state, 
    //         editTrackStepsArray: 
    //             [...editTrackStepsArray, 
    //                 editTrackStepsArray[trackId] = !editTrackStepsArray[trackId]]
    //       }))
    //     },
    //     [editTrackStepsArray]
    // )

    return {
        trackView,
        // zoomIndex, 
        zoom, 
        // zoomIn, 
        // zoomOut,
        toggleZoom, 
        // viewTrackSteps,
        // editTrackStepsArray,
        toggleTrackView
        // toggleViewTrackSteps,
        // setEditTrackStepsArray
    }
}

export default useViews