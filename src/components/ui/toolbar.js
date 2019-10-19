import React from 'react'
import ToolbarBtn from './toolbarBtn';
// import Modal from './modal'
// import Login from './login'

import { useAuth } from "../../hooks/useAuth";
import useViews from "../../hooks/useViews";

import vars from '../../scss/_vars.scss';
import classes from './ui.module.scss'

const toolbar = () => {

    const auth = useAuth()
    const { trackView, toggleTrackView, zoom, toggleZoom } = useViews()
    
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
                        clickHandler={()=>{toggleTrackView()}} 
                        colors={[vars.defaultWhite, trackView === 0 ? vars.greencolor : trackView === 1 ? vars.redcolor : vars.hiliteWhite ]} 
                        size={20} 
                        icon='eye'/>
                </li>
                {/* <li>
                    <ToolbarBtn 
                        clickHandler={()=>{toggleViewTrackSteps()}} 
                        colors={[vars.defaultWhite,vars.hiliteWhite]} 
                        size={20} 
                        icon='music'/>
                </li> */}
                <li>
                    <ToolbarBtn 
                        clickHandler={()=>{toggleZoom()}}
                        colors={[vars.defaultWhite,vars.hiliteWhite]} 
                        size={20} 
                        icon={zoom === 2 ? 'zoom-out' : 'zoom-in' }
                        disabled={!auth.user}/>
                </li>
                <li>
                    <ToolbarBtn 
                        clickHandler={auth.user ? ()=>{} : null} 
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