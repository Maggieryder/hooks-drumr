import { useState, useEffect } from 'react'
import { AUDIO_CONTEXT } from '../api'

const PATH = 'assets/audio/'

const useLoadBuffers = () => {
    const [buffers, setBuffers] = useState([])
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     let buffersToLoad
    //     const loadBuffer = async (url, label, value) => {
    //         const request = new XMLHttpRequest()
    //         //header('Access-Control-Allow-Origin: *')
    //         request.open('get', url, true)
    //         request.responseType = 'arraybuffer'
    //         request.onload = function() {
    //             AUDIO_CONTEXT.decodeAudioData(request.response, function(buffer) {
    //                 setBuffers([...buffers, { label, value, buffer }])
    //                 ( buffersToLoad < 1) ? setLoading(false) : buffersToLoad --   
    //             },
    //             function(e){ alert("Error with decoding audio data", e ); })
    //         }
    //         request.send()
    //     }
    //     function loadBuffers({ dir, voices } ) {
    //         buffersToLoad = voices.length
    //         setLoading(true)
    //         voices.map( v => {
    //             loadBuffer(PATH + dir + v.smple, v.label, v.value)
    //             return false
    //         })
    //     }
        
    // },[ data ])

    let buffersToLoad
    const loadBuffer = async (url, label, value) => {
        const request = new XMLHttpRequest()
        //header('Access-Control-Allow-Origin: *')
        request.open('get', url, true)
        request.responseType = 'arraybuffer'
        request.onload = function() {
            AUDIO_CONTEXT.decodeAudioData(request.response, function(buffer) {
                setBuffers([...buffers, { label, value, buffer }])
                buffersToLoad < 1 ? setLoading(false) : buffersToLoad --   
            },
            function(e){ alert("Error with decoding audio data", e ); })
        }
        request.send()
    }
    const loadBuffers = async ({ dir, voices }) => {
        buffersToLoad = voices.length
        console.log('buffersToLoad', buffersToLoad)
        setLoading(true)
        voices.map( v => loadBuffer(PATH + dir + v.smple, v.label, v.value))
    }
    return { buffers, loading, loadBuffers }
}

export default useLoadBuffers