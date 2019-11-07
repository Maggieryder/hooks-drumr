import React, { useCallback, useContext} from 'react'
import ToolbarBtn from './toolbarBtn';

import { DrumrContext } from '../../context/DrumrContext'
import { useAuth } from "../../hooks/useAuth";
import useViews from "../../hooks/useViews";
import useSequencer from '../../hooks/useSequencer'

import vars from '../../scss/_vars.scss';
import classes from './ui.module.scss'

const toolbar = () => {

    const auth = useAuth()
    const { trackView, toggleTrackView, zoom, toggleZoom } = useViews()
    const { copyBars, pasteBars } = useSequencer()

    const {state, dispatch} = useContext(DrumrContext)

    const storeSong = useCallback(
        (user, params) => {
          console.log('storeSong', user, params )
          // loadBuffers(kits[currentKitId])
        }, []
    )
    
    return (
        <nav className={classes.toolbar}>
            <ul className={classes['toolbar-nav']}>
                <li>
                    <ToolbarBtn 
                        clickHandler={() => {auth.user ? auth.signout() : auth.setLogin(true) }}
                        colors={[vars.defaultWhite,vars.hiliteWhite]} 
                        size={20} 
                        icon={auth.user ? 'exit' : 'enter'} />
                </li>       
                <li>
                    <ToolbarBtn 
                        clickHandler={toggleTrackView} 
                        colors={[vars.defaultWhite, trackView === 0 ? vars.greencolor : trackView === 1 ? vars.redcolor : vars.hiliteWhite ]} 
                        size={20} 
                        icon='eye'/>
                </li>
                <li>
                    <ToolbarBtn 
                        clickHandler={toggleZoom}
                        colors={[vars.defaultWhite,vars.hiliteWhite]} 
                        size={20} 
                        icon={zoom === 2 ? 'zoom-out' : 'zoom-in' }
                        disabled={!auth.user}/>
                </li>
                <li>
                    <ToolbarBtn 
                        clickHandler={()=>{copyBars(zoom)}} 
                        colors={[vars.defaultWhite,vars.hiliteWhite]} 
                        size={20} 
                        icon='eyedropper'
                        disabled={!auth.user}/>
                </li>
                <li>
                    <ToolbarBtn 
                        clickHandler={()=>{pasteBars(zoom)}} 
                        colors={[vars.defaultWhite,vars.hiliteWhite]} 
                        size={20} 
                        icon='droplet'
                        disabled={!auth.user}/>
                </li>
                <li>
                    <ToolbarBtn 
                        clickHandler={auth.user ? () => storeSong(auth.user, state) : null} 
                        colors={[vars.defaultWhite,vars.hiliteWhite]} 
                        size={20} 
                        icon="folder-download"
                        disabled={!auth.user}/>
                </li>                  
            </ul>
        </nav>
    )
}

export default toolbar