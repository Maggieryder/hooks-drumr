import { useState, useEffect, useContext } from 'react'

import useDrumr from './useDrumr'

const useMixer = ( mixer ) => {

    const { context, tracks } = useDrumr()

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