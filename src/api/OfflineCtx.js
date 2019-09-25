const OfflineCtx = (buffer) => {
    const offline = new OfflineAudioContext(2,44100*40,44100)
    const source = offline.createBufferSource()

    source.buffer = buffer
    source.connect(offline.destination)
    source.start()
    offline.startRendering()

    offline.oncomplete = (e) => {
        return e.renderedBuffer
    }
}

export default OfflineCtx