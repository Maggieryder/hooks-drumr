import React, { useState, useEffect, useRef, useCallback, useContext } from 'react'
// import PropTypes  from 'prop-types'

// import { getPixelRatio } from '../../utils/canvas'

import useTrack from '../../hooks/useTrack'

import { ViewsContext } from '../../context/ViewsContext'
import { DrumrContext } from '../../context/DrumrContext'

import vars from '../../scss/_vars.scss'

import classes from './soundwave.module.scss'

const Soundwave = ({ onClickHandler, buffer, label, track, isMute }) => {

    const { state: { sequencer: { isPlaying }}} = useContext(DrumrContext)

    const { trackView } = useContext(ViewsContext)[0]

    const { isInPlay, triggerPlay } = useTrack()
    
    const [ amp, setAmp ] = useState(2)
    const [ canvasWidth, setCanvasWidth ] = useState(100)
    const [ canvasHeight, setCanvasHeight ] = useState(60)
    const canvasRef = useRef()  

    const style = { '--track-color': !isMute && isInPlay ? track.color() : vars.waveWhite }

    useEffect(() => {
        // console.log('[Soundwave] INIT buffer', buffer)
        const sizeHandler = () => {
            console.log('[ Soundwave ] sizeHandler')
            setCanvasWidth(canvasRef.current.parentNode.clientWidth)
            setCanvasHeight(canvasRef.current.parentNode.clientHeight)
            drawBuffer( buffer, track ? track.color() : vars.waveWhite, 0 )
        }
        const triggerNoteHandler = (e) => {
            // console.log('triggerNoteHandler', e.detail.id())
            if (track && e.detail.id() === track.id()){
                triggerPlay({trackId: track.id(), value: true})
            }
        }
        window.addEventListener('resize', sizeHandler)
        window.addEventListener('triggerNote', triggerNoteHandler)
        sizeHandler()
        // console.log('Canvas Height', canvasHeight)
        return(()=> {
            window.removeEventListener('resize', sizeHandler)
            window.removeEventListener('triggerNote', triggerNoteHandler)
        })
    }, [])

    useEffect(() => {
        setAmp(isPlaying ? 1 : 2)
    }, [isPlaying])


    useEffect(() => {
        // console.log('[Soundwave] Update on isInPlay', isInPlay)

        let startTime, requestId
        
        const render = (timestamp) => {
            // console.log('timestamp', timestamp)
            const now = timestamp / 1000
            // console.log('now', now)
            const runtime = now - startTime
            // console.log('runtime', runtime)
            const progress = Math.min(runtime / (buffer.duration * amp), 1)
            // console.log('progress', progress)
            drawBuffer( buffer, track.color(), progress )
            if ( runtime < (buffer.duration * amp)) {
                requestId = requestAnimationFrame(function(timestamp){
                    render(timestamp)
                })
            } else {
                triggerPlay({trackId: track.id(), value: false})
                requestId = null
                // drawBuffer( buffer, track.color(), 0 ) 
            }
        }
        if (!isMute && isInPlay && !requestId) {
            requestId = requestAnimationFrame(function(timestamp){
                // startTime = timestamp || new Date().getTime()
                startTime = timestamp / 1000
                // startTime = audioContext.currentTime
                // console.log('START RAF', startTime)
                // console.log('BUFFER DUR', buffer.duration*amp)
                render(timestamp)
            })
        } else {
            // triggerPlay({trackId: track.id(),value: false})
            drawBuffer( buffer, track ? track.color() : vars.waveWhite, 0 ) 
        }
        
        return(()=> {
            if (!!requestId) cancelAnimationFrame(requestId)
        })
    }, [isMute, isInPlay, buffer, trackView, canvasWidth, canvasHeight])

    

    const drawBuffer = useCallback((buffer, color, progress) => {
        if (!buffer) return
        const context = canvasRef.current.getContext('2d')
        // const ratio = getPixelRatio(context)
        let data = buffer.getChannelData( 0 );
        let step = Math.ceil( data.length / canvasWidth );
        let amp = canvasHeight / 2;
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        // context.fillStyle = "rgba(255,255,255,.05)";
        // context.fillRect(0,0,canvasWidth,canvasHeight);
        // context.fillStyle = isPlaying ? color : "rgba(255,255,255,.2)"; /*47AE32;*/
        context.fillStyle = vars.waveWhite;
        for(let i=0; i < canvasWidth; i++){
            let min = 1.0;
            let max = -1.0;
            for (let j=0; j<step; j++) {
                let datum = data[(i*step)+j];
                if (datum < min)
                    min = datum;
                if (datum > max)
                    max = datum;
            }
            context.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
        }
        if (progress > 0){
            context.fillStyle = color;
            for(let p=0; p < canvasWidth*progress; p++){
                let min2 = 1.0;
                let max2 = -1.0;
                for (let q=0; q<step; q++) {
                    let datum2 = data[(p*step)+q];
                    if (datum2 < min2)
                        min2 = datum2;
                    if (datum2 > max2)
                        max2 = datum2;
                }
                context.fillRect(p,(1+min2)*amp,1,Math.max(1,(max2-min2)*amp));
            }
        }
    }, [ canvasWidth, canvasHeight, canvasRef ])

    return (
        <div id={track ? track.id() : ''} data-label={label} className={classes['sound-wave']} style={style} onClick={onClickHandler} >
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        </div>
    )

}

// Soundwave.propTypes = {
//   //
// }

export default Soundwave