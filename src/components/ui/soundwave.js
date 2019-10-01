import React, { useState, useEffect, useRef } from 'react'
import PropTypes  from 'prop-types'

import useSequencer from '../../hooks/useSequencer'

import classes from './soundwave.module.scss'

const Soundwave = ({ buffer, id, color, label }) => {

    const { numSteps, currentBar, currentStep, isPlaying } = useSequencer()

    // const isCurrentBar = currentBar === barId

    const [ canvasWidth, setCanvasWidth ] = useState()
    const [ canvasHeight, setCanvasHeight ] = useState()

    const style = { '--track-color': color }

    const canvas = useRef()  

    useEffect(() => {
        //console.log('[Soundwave] init canvas.current.clientWidth', canvas.current.clientWidth)
        window.addEventListener('resize', resizeHandler);
        console.log('Canvas Height', canvasHeight)
        /* Allows CSS to determine size of canvas */
        setCanvasWidth(canvas.current.parentNode.clientWidth)
        setCanvasHeight(canvas.current.parentNode.clientHeight)

        const dur = buffer.duration,
            startTime = new Date();
        console.log('[Soundwave] init buffer.duration', buffer.duration)

        // sampleIntvlId = setInterval(() => {
        //   console.log('auditionPlayer.state === "stopped"', auditionPlayer.state === "stopped")
        //   if (auditionPlayer.state === "stopped") {
        //     clearInterval(sampleIntvlId);
        //     drawBuffer( canvasWidth , canvasHeight, canvas.current.getContext('2d'), buffer, color, 0 )
        //   } else {
        //     let nowTime = new Date();
        //     let timeDiff = (nowTime - startTime)/1000;
        //     let perc = (timeDiff/dur);
        //     // perc = (perc > 95) ? 100 : perc;
        //     // console.log('perc played', perc);
        //     drawBuffer( canvasWidth , canvasHeight, canvas.current.getContext('2d'), buffer, color, perc);
        //   }
        // }, 100);

        // const progress = isCurrentBar ? isPlaying ? (currentStep / (numSteps - 1)) : ((currentStep+1) / numSteps) : 0
        drawBuffer( canvasWidth , canvasHeight, canvas.current.getContext('2d'), buffer, color, .25 )
        return(()=> {
            window.removeEventListener('resize', resizeHandler);
        })
    }, [buffer, canvasWidth, canvasHeight])

    // useEffect(() => {
    //     console.log('[Soundwave] update canvas.current.clientWidth', canvas.current.clientWidth)
    //     if (!isPlaying) {
    //         drawBuffer( canvasWidth , canvasHeight, canvas.current.getContext('2d'), buffer, color, 0 );
    //     }
    //     return(()=> {
            
    //     })
    // }, [isPlaying])

    const resizeHandler = () => {
        console.log('_resizeHandler')
        /* Allows CSS to determine size of canvas */
        setCanvasWidth(canvas.current.parentNode.clientWidth)
        setCanvasHeight(canvas.current.parentNode.clientHeight)
        // drawBuffer( canvasWidth , canvasHeight, canvas.current.getContext('2d'), buffer, color, 0 );
    }

    const drawBuffer = (width, height, context, buffer, color, progress) => {
        let data = buffer.getChannelData( 0 );
        let step = Math.ceil( data.length / width );
        let amp = height / 2;
        context.clearRect(0, 0, width, height);
        // context.fillStyle = "rgba(255,255,255,.05)";
        // context.fillRect(0,0,width,height);
        // context.fillStyle = isPlaying ? color : "rgba(255,255,255,.2)"; /*47AE32;*/
        context.fillStyle = 'rgba(255,255,255,.2)';
        for(let i=0; i < width; i++){
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
            for(let p=0; p < width*progress; p++){
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
    }

    return (
        <div id={id} data-label={label} className={classes['sound-wave']} style={style} onClick={() => {}}>
            <canvas ref={canvas} width={canvasWidth} height={canvasHeight} />
        </div>
    )

}

Soundwave.propTypes = {
  //
}

export default Soundwave