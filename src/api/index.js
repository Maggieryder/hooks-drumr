import { initAudioCtx } from './AudioCtx'
import Mixer from './Mixer'
import Reverb from './Reverb'
import Delay from './Delay'
import Compressor from './Compressor'
import Track from './Track'
import Sequencer from './Sequencer'

export const AUDIO_CONTEXT = initAudioCtx();
export const MIXER = new Mixer(AUDIO_CONTEXT)
export const REVERB = new Reverb(AUDIO_CONTEXT, MIXER.wetMix())
export const DELAY = new Delay(AUDIO_CONTEXT, MIXER.wetMix())
export const COMPRESSOR = new Compressor(AUDIO_CONTEXT, MIXER.masterMix(), AUDIO_CONTEXT.destination)
export const SEQUENCER = new Sequencer(AUDIO_CONTEXT)