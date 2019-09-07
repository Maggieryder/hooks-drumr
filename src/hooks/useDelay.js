import { useState, useEffect, useContext } from 'react'

import { DrumrContext } from '../context/DrumrContext'

import { DELAY } from '../api'

const useDelay = () => {

    const { state: { sequencer: {tempo} } } = useContext(DrumrContext)

    const [delayTime, setDelayTime] = useState(.5)
    const [delayFeedback, setDelayFeedback] = useState(.475)
    const [delayFrequency, setDelayFrequency] = useState(1000)
    const [delayOn, setDelayOn] = useState(false)

    useEffect(() => {
        // console.log('[useDelay] INIT')
        return (() => {
            DELAY.destroy()
        })
    }, [])


    useEffect(() => {
        // console.log('[useDelay] delayOn', delayOn)
        DELAY.toggleOn(delayOn)
      }, [delayOn])

    useEffect(() => {      
        console.log('[useDelay] delayTime tempo change', tempo)
        // setDelayTime(60.0 / tempo * time)
    }, [tempo])

    useEffect(() => {      
        console.log('[useDelay] delayTime', delayTime)
        DELAY.updateDelayTime(delayTime)
    }, [delayTime])

    useEffect(() => {      
        // console.log('[useDelay] delayFeedback', delayFeedback)
        DELAY.updateFeedbackGain(delayFeedback)
    }, [delayFeedback])

    useEffect(() => {      
        // console.log('[useDelay] delayFrequency', delayFrequency)
        DELAY.updateFrequency(delayFrequency)
    }, [delayFrequency])

    return {
        delayOn, setDelayOn, 
        delayTime, setDelayTime,
        delayFeedback, setDelayFeedback,
        delayFrequency, setDelayFrequency
    }

}

export default useDelay