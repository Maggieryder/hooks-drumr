import { useState, useEffect, useContext } from 'react'
import { DrumrContext } from '../context/DrumrContext'

// import * as TYPES from '../actions/types'

import { REVERB } from '../api'


const useReverb = () => {

    const {state:{ controller: { verbBuffers } } } = useContext(DrumrContext)

    const [ reverbOn, setReverbOn ] = useState(false)
    const [ reverbId, setReverbId ] = useState(0)

    useEffect(() => {
        // console.log('[useReverb] INIT', verbBuffers)
        return (() => {
            REVERB.destroy()
        })
      }, [])


    useEffect(() => {     
        if (verbBuffers) {
            // console.log('[useReverb] reverbOn', reverbOn)
            REVERB.toggleOn(reverbOn)
        }
      }, [reverbOn])

    useEffect(() => { 
        if (verbBuffers) {
            // console.log('[useReverb] verbBuffers', verbBuffers[reverbId].buffer)
            REVERB.setImpulse(verbBuffers[reverbId].buffer)
        }
    }, [verbBuffers])

    useEffect(() => {  
        if (verbBuffers) {
            // console.log('[useReverb] REVERB ID CHANGE', verbBuffers[reverbId].buffer)
            REVERB.setImpulse(verbBuffers[reverbId].buffer)
        }
    }, [reverbId])

    return {
        verbBuffers, 
        reverbOn,
        setReverbOn,
        reverbId,
        setReverbId
    }

}

export default useReverb