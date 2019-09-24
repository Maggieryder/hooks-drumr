import React from 'react'
import ToolbarBtn from './toolbarBtn';
// import Modal from './modal'
// import Login from './login'

import { useAuth } from "../../hooks/useAuth.js";

import vars from '../../scss/_vars.scss';
import classes from './ui.module.scss'

const toolbar = () => {

    const auth = useAuth();
    
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
                        clickHandler={auth.user ? ()=>{} : null}
                        colors={[vars.defaultWhite,vars.hiliteWhite]} 
                        size={20} 
                        icon="zoom-in"
                        disabled={!auth.user}/>
                </li>
                <li>
                    <ToolbarBtn 
                        clickHandler={auth.user ? ()=>{} : null} 
                        colors={[vars.defaultWhite,vars.hiliteWhite]} 
                        size={20} 
                        icon="copy"
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