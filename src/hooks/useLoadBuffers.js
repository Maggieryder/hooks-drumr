import { useState, useEffect } from 'react'
import { AUDIO_CONTEXT } from '../api'

const PATH = 'assets/audio/'

const useLoadBuffers = () => {
    const [buffers, setBuffers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if( !loading ) {
            // console.log('[ useLoadBuffers ]', buffers)
        } 
    },[loading, buffers])

    const loadBuffer = async (data, callback) => {
        const request = new XMLHttpRequest()
        //header('Access-Control-Allow-Origin: *')
        request.open('get', data.url, true)
        request.responseType = 'arraybuffer'
        request.onload = function() {    
            AUDIO_CONTEXT.decodeAudioData(request.response, function(buffer) {
                callback(buffer)
            },
            function(e){ console.log("Error with decoding audio data", e ) })
        }
        request.send()
    }
    
    const loadBuffers = async ({directory, voices}) => {
        setLoading(true)
        let buffersToLoad = voices.length,
        data = []
        voices.map((voice, i) => {
            const voiceData = {
                url: PATH + directory + voice.smple,
                label: voice.label,
                value: voice.value
            }
            return loadBuffer( voiceData, (buffer) => {
                data.push({
                    buffer: buffer,
                    label: voiceData.label,
                    value: voiceData.value
                })
                console.log('buffer', buffersToLoad)
                buffersToLoad --
                if (buffersToLoad < 1) {
                    setBuffers(data)
                    setLoading(false)
                }
            })
            // return false
        })
    }

    return { 
        buffers, 
        loading, 
        loadBuffers 
    }
}

export default useLoadBuffers