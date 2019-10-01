
const Sample = (ctx, buffer) => {
  const source = ctx.createBufferSource()
  source.buffer = buffer
  return source
}

const trigger = (sample, time) => {
  sample.start(time)
}

export { Sample, trigger }