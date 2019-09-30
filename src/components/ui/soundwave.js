import React, { useState, useEffect, useRef } from 'react'
import PropTypes  from 'prop-types'

import useSequencer from '../hooks/useSequencer'

const Soundwave = ({ buffer, id, color, index }) => {

    const { isPlaying } = useSequencer()

    const [ canvasWidth, setCanvasWidth ] = useState()
    const [ canvasHeight, setCanvasHeight ] = useState()

    const canvas = useRef()  

    useEffect(() => {
        console.log('[Soundwave] init this.canvas.clientWidth', this.canvas.clientWidth)
        window.addEventListener('resize', resizeHandler);
        /* Allows CSS to determine size of canvas */
        setCanvasWidth(this.canvas.clientWidth)
        setCanvasHeight(this.canvas.clientHeight)
        drawBuffer( canvasWidth , canvasHeight, this.canvas.getContext('2d'), buffer, color, 0 );
        return(()=> {
            window.removeEventListener('resize', resizeHandler);
        })
    }, [])

    useEffect(() => {
        console.log('[Soundwave] update this.canvas.clientWidth', this.canvas.clientWidth)
        if (!isPlaying) {
            drawBuffer( canvasWidth , canvasHeight, this.canvas.getContext('2d'), buffer, color, 0 );
        return(()=> {
            
        })
    }, [isPlaying])

    resizeHandler = () => {
        console.log('_resizeHandler')
        /* Allows CSS to determine size of canvas */
        setCanvasWidth(this.canvas.clientWidth)
        setCanvasHeight(this.canvas.clientHeight)
        drawBuffer( canvasWidth , canvasHeight, this.canvas.getContext('2d'), buffer, color, 0 );
    }

    drawBuffer(width, height, context, buffer, color, progress) {
        let data = buffer.getChannelData( 0 );
        let step = Math.ceil( data.length / width );
        let amp = height / 2;
        context.clearRect(0, 0, width, height);
        context.fillStyle = "rgba(255,255,255,.1)";
        context.fillRect(0,0,width,height);
        context.fillStyle = isPlaying ? color : "rgba(255,255,255,.2)"; /*47AE32;*/
        // context.fillStyle = "rgba(255,255,255,.2)";
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
        <div id={id} data-index={index} className={isPlaying ? 'sound-wave playing' : 'sound-wave'} onClick={() => {}}>
            <canvas ref={canvas => this.canvas = canvas} />
        </div>
    )

}

Soundwave.propTypes = {
  //
}

export default Soundwave