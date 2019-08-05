import { useState, useEffect, useContext } from 'react'

// import { DrumrContext } from '../context/DrumrContext'
// import * as TYPES from '../actions/types'

// import useDrumr from './useDrumr'

import { DELAY } from '../api'

const useDelay = () => {

    const [delayTime, setDelayTime] = useState(.5)
    const [delayFeedback, setDelayFeedback] = useState(.475)
    const [delayFrequency, setDelayFrequency] = useState(1000)
    const [delayOn, setDelayOn] = useState(false)

    useEffect(() => {
        console.log('[useDelay] INIT')
        return (() => {
            DELAY.destroy()
        })
      }, [])


    useEffect(() => {
        console.log('[useDelay] delayOn', delayOn)
        DELAY.toggleOn(delayOn)
        return (() => {

        })
      }, [delayOn])

    useEffect(() => {      
        console.log('[useDelay] delayTime', delayTime)
        DELAY.updateDelayTime(delayTime)
        return (() => {

        })
    }, [delayTime])

    useEffect(() => {      
        console.log('[useDelay] delayFeedback', delayFeedback)
        DELAY.updateFeedbackGain(delayFeedback)
        return (() => {

        })
    }, [delayFeedback])

    useEffect(() => {      
        console.log('[useDelay] delayFrequency', delayFrequency)
        DELAY.updateFrequency(delayFrequency)
        return (() => {

        })
    }, [delayFrequency])

    return {
        delayOn, setDelayOn, 
        delayTime, setDelayTime,
        delayFeedback, setDelayFeedback,
        delayFrequency, setDelayFrequency
    }

}

export default useDelay