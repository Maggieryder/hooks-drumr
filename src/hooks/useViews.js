import { useContext, useCallback } from 'react'
import { ViewsContext } from '../context/ViewsContext'

const TRACK_VIEWS = ['settings', 'steps', 'both']

const useViews = () => {

    const [state, setState] = useContext(ViewsContext)

    const {
        trackView,
        viewTrackSteps,
        editTrackStepsArray
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

    const toggleViewTrackSteps = useCallback(
        () => {
          console.log('[useViews] setViewTrackSteps')
          setState(state => ({ 
            ...state, 
            viewTrackSteps: !viewTrackSteps 
          }))
        },
        [viewTrackSteps]
    )

    const setEditTrackStepsArray = useCallback(
        ({ trackId  }) => {
          console.log('[useViews] setEditTrackStepsArray')
          setState(state => ({ 
            ...state, 
            editTrackStepsArray: 
                [...editTrackStepsArray, 
                    editTrackStepsArray[trackId] = !editTrackStepsArray[trackId]]
          }))
        },
        [editTrackStepsArray]
    )

    return {
        trackView,
        viewTrackSteps,
        editTrackStepsArray,
        toggleTrackView,
        toggleViewTrackSteps,
        setEditTrackStepsArray
    }
}

export default useViews