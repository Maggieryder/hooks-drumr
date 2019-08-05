import { useState, useEffect, useContext } from 'react'

// import { DrumrContext } from '../context/DrumrContext'
// import * as TYPES from '../actions/types'

// import useDrumr from './useDrumr'

import { COMPRESSOR } from '../api'

const useCompressor = () => {

    const [compOn, setCompOn] = useState(false)
    const [compThreshold, setCompThreshold] = useState(-24)
    const [compKnee, setCompKnee] = useState(30)
    const [compRatio, setCompRatio] = useState(12)
    const [compAttack, setCompAttack] = useState(0.01)
    const [compRelease, setCompRelease] = useState(0.25)

    useEffect(() => {
        console.log('[useCompressor] INIT')
        return (() => {
            COMPRESSOR.destroy()
        })
      }, [])


    useEffect(() => {
        console.log('[useCompressor] compOn', compOn)
        COMPRESSOR.toggleOn(compOn)
        return (() => {

        })
      }, [compOn])

    useEffect(() => {      
        console.log('[useCompressor] compThreshold', compThreshold)
        COMPRESSOR.updateThreshold(compThreshold)
        return (() => {

        })
    }, [compThreshold])

    useEffect(() => {      
        console.log('[useCompressor] compKnee', compKnee)
        COMPRESSOR.updateKnee(compKnee)
        return (() => {

        })
    }, [compKnee])

    useEffect(() => {      
        console.log('[useCompressor] compRatio', compRatio)
        COMPRESSOR.updateRatio(compRatio)
        return (() => {

        })
    }, [compRatio])

    useEffect(() => {      
        console.log('[useCompressor] compAttack', compAttack)
        COMPRESSOR.updateAttack(compAttack)
        return (() => {

        })
    }, [compAttack])

    useEffect(() => {      
        console.log('[useCompressor] compRelease', compRelease)
        COMPRESSOR.updateRelease(compRelease)
        return (() => {

        })
    }, [compRelease])

    return {
        compOn, setCompOn, 
        compThreshold, setCompThreshold,
        compKnee, setCompKnee,
        compRatio, setCompRatio,
        compAttack, setCompAttack,
        compRelease, setCompRelease
    }

}

export default useCompressor