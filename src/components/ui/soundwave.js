import React, { useState, useEffect, useRef, useCallback, useContext } from 'react'
import PropTypes  from 'prop-types'

import { getPixelRatio } from '../../utils/canvas'

// import useSequencer from '../../hooks/useSequencer'
import useTrack from '../../hooks/useTrack'

import { ViewsContext } from '../../context/ViewsContext'

import classes from './soundwave.module.scss'

const amp = 2

const Soundwave = ({ onClickHandler, label, track }) => {

    // const { numSteps, currentBar, currentStep, isPlaying } = useSequencer()

    const { trackView } = useContext(ViewsContext)[0]

    const { buffer, isInPlay, triggerPlay } = useTrack()

    // const isCurrentBar = currentBar === barId
    
    const [ canvasWidth, setCanvasWidth ] = useState(100)
    const [ canvasHeight, setCanvasHeight ] = useState(60)
    const canvasRef = useRef()  

    const style = { '--track-color': track.color() }

    useEffect(() => {
        console.log('[Soundwave] INIT buffer', buffer)
        const sizeHandler = () => {
            console.log('[ Soundwave ] sizeHandler')
            setCanvasWidth(canvasRef.current.parentNode.clientWidth)
            setCanvasHeight(canvasRef.current.parentNode.clientHeight)
            drawBuffer( buffer, track.color(), 0 )
        }
        window.addEventListener('resize', sizeHandler)
        sizeHandler()
        console.log('Canvas Height', canvasHeight)
        return(()=> {
            window.removeEventListener('resize', sizeHandler)
        })
    }, [])

    // useEffect(() => {
    //     console.log('############ [Soundwave] Update on new Buffer', buffer)
    //     drawBuffer( buffer, track.color(), 0 ) 
    // }, [buffer])


    useEffect(() => {
        console.log('[Soundwave] Update on isInPlay', isInPlay)

        let startTime, requestId
        
        const render = (timestamp) => {
            // console.log('timestamp', timestamp)
            const now = timestamp / 1000
            // console.log('now', now)
            const runtime = now - startTime
            // console.log('runtime', runtime)
            const progress = Math.min(runtime / (buffer.duration * amp), 1)
            console.log('progress', progress)
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
        if (isInPlay) {
            requestId = requestAnimationFrame(function(timestamp){
                // startTime = timestamp || new Date().getTime()
                startTime = timestamp / 1000
                // startTime = audioContext.currentTime
                console.log('START RAF', startTime)
                console.log('BUFFER DUR', buffer.duration*amp)
                render(timestamp)
            })
        } else {
            // triggerPlay({trackId: track.id(),value: false})
            drawBuffer( buffer, track.color(), 0 ) 
        }
        
        return(()=> {
            if (!!requestId) cancelAnimationFrame(requestId)
        })
    }, [isInPlay, buffer, trackView, canvasWidth, canvasHeight])

    

    const drawBuffer = useCallback((buffer, color, progress) => {
        if (!buffer) return
        const context = canvasRef.current.getContext('2d')
        const ratio = getPixelRatio(context)
        let data = buffer.getChannelData( 0 );
        let step = Math.ceil( data.length / canvasWidth );
        let amp = canvasHeight / 2;
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        // context.fillStyle = "rgba(255,255,255,.05)";
        // context.fillRect(0,0,canvasWidth,canvasHeight);
        // context.fillStyle = isPlaying ? color : "rgba(255,255,255,.2)"; /*47AE32;*/
        context.fillStyle = 'rgba(255,255,255,.2)';
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
        <div id={track.id()} data-label={label} className={classes['sound-wave']} style={style} onClick={onClickHandler}>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        </div>
    )

}

Soundwave.propTypes = {
  //
}

export default Soundwave