import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes  from 'prop-types'

import { getPixelRatio } from '../../utils/canvas'

import useSequencer from '../../hooks/useSequencer'

import classes from './soundwave.module.scss'

const Soundwave = ({ audioContext, buffer, id, color, label }) => {

    let requestId = null

    const { numSteps, currentBar, currentStep, isPlaying } = useSequencer()

    // const isCurrentBar = currentBar === barId

    const [ canvasWidth, setCanvasWidth ] = useState()
    const [ canvasHeight, setCanvasHeight ] = useState()
    const canvasRef = useRef()  

    const style = { '--track-color': color }

    useEffect(() => {
        console.log('[Soundwave] INIT buffer', buffer)
        window.addEventListener('resize', sizeHandler)
        sizeHandler()
        console.log('Canvas Height', canvasHeight)
        return(()=> {
            window.removeEventListener('resize', sizeHandler)
        })
    }, [])

    // useEffect(() => {
    //     console.log('[Soundwave] Update on new Buffer, or size', isPlaying)
        
    // }, [buffer, canvasWidth, canvasHeight])


    useEffect(() => {
        console.log('[Soundwave] Update on isPlaying', isPlaying)
        
        // if (isPlaying) {
        //     const startTime = new Date().getTime()
        //     const render = (timestamp) => {
                
        //         const runtime = timestamp - (startTime/1000),
        //             progress = runtime/buffer.duration
        //         console.log('timestamp', timestamp, 'startTime', startTime)
        //         drawBuffer( buffer, color, progress )
        //         requestId = requestAnimationFrame((render))
        //     }  
        //     render()  
        // } else {   
        //     drawBuffer( buffer, color, 0 ) 
        //     if (!!requestId) {
        //         cancelAnimationFrame(requestId)
        //         requestId = null
        //     }
        // }
        let startTime, requestId
        
        const render = (timestamp) => {
            console.log('timestamp', timestamp)
            const now = timestamp / 1000
            console.log('now', now)
            const runtime = now - startTime
            console.log('runtime', runtime)
            const progress = Math.min(runtime / (buffer.duration * 2), 1)
            // console.log('progress', progress)
            drawBuffer( buffer, color, progress )
            if ( runtime < (buffer.duration * 2)) {
                requestId = requestAnimationFrame(function(timestamp){
                    render(timestamp)
                })
            } else {
                drawBuffer( buffer, color, 0 ) 
                cancelAnimationFrame(requestId)
                requestId = null
            }
        }
        requestId = requestAnimationFrame(function(timestamp){
            // startTime = timestamp || new Date().getTime()
            startTime = timestamp / 1000
            // startTime = audioContext.currentTime
            console.log('START RAF', startTime)
            console.log('BUFFER DUR', buffer.duration*2)
            render(timestamp)
        })
        return(()=> {
            if (!!requestId) {
                cancelAnimationFrame(requestId)
                requestId = null
            }
        })
    }, [isPlaying, buffer])

    const sizeHandler = () => {
        console.log('[ Soundwave ] sizeHandler')
        setCanvasWidth(canvasRef.current.parentNode.clientWidth)
        setCanvasHeight(canvasRef.current.parentNode.clientHeight)
    }

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
    }, [ canvasWidth, canvasHeight ])

    return (
        <div id={id} data-label={label} className={classes['sound-wave']} style={style} onClick={() => {}}>
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        </div>
    )

}

Soundwave.propTypes = {
  //
}

export default Soundwave