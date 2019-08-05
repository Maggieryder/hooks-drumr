import { useState, useEffect, useContext } from 'react'

// import * as TYPES from '../actions/types'
// import Mixer from '../api/Mixer'

import Track from '../api/Track'

import useDrumr from './useDrumr'

// let reverb

const useMixer = ( mixer ) => {

    const { context, tracks } = useDrumr()

    // reverb = reverb ? reverb : new Reverb(context, destination)

    useEffect(() => {
        console.log('[useMixer] INIT', )
        
        return (() => {
          
        })
      }, [])

  

    return {
        reverb,
        delay,
        compressor,
        tracks
    }

}

export default useMixer;