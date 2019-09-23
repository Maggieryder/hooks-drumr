import React, {useState} from 'react'
import ToolbarBtn from './ui/toolbarBtn';
import Modal from './ui/modal'
import Login from './ui/login'
import styled from 'styled-components';

import { useAuth } from "../hooks/useAuth.js";


import vars from '../scss/_vars.scss';


const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%; 
    background: #282c34; 
`
const Toolbar = styled.nav`
    position: fixed;
    top: 0;
    right: 0;
    width: 44px;
    height: 100%;
    background: #282c34;
    border-left: 1px solid rgba(255,255,255,.1);
    z-index: 10;
`
const MainContent = styled.section`
    position:absolute;
    display: block;
    overflow: hidden;
    top: 0;
    left: 0;
    width: calc(100% - 44px);
    height: 100%;
    
`


const layout = ({children}) => {
    const [hover, setHover] = useState(false)

    const [ login, setLogin ] = useState(false)

    const auth = useAuth();
    
    return (
        <Wrapper>
            <Toolbar>
                <ul className='toolbar-nav'>
                    <li>
                        <ToolbarBtn 
                            clickHandler={() => {auth.user ? auth.signout() : setLogin(true) }}
                            colors={[vars.lightgraycolor,vars.greencolor]} 
                            size={24} 
                            icon={auth.user ? 'exit' : 'enter'} />
                    </li>
                    {auth.user ? 
                    <>
                        <li>
                            <ToolbarBtn 
                                clickHandler={()=>{}}
                                colors={[vars.lightgraycolor,vars.greencolor]} 
                                size={24} 
                                icon="zoom-in"/>
                        </li>
                        <li>
                            <ToolbarBtn 
                                clickHandler={()=>{}} 
                                colors={[vars.lightgraycolor,vars.greencolor]} 
                                size={24} 
                                icon="copy"/>
                        </li>
                        <li>
                            <ToolbarBtn 
                                clickHandler={()=>{}} 
                                colors={[vars.lightgraycolor,vars.greencolor]} 
                                size={24} 
                                icon="folder-download"/>
                        </li>
                    </> : null }
                </ul>
            </Toolbar>
            <MainContent>
                {children}
            </MainContent>
            <Modal show={login} modalClosed={() => setLogin(false)}>
                <Login modalClosed={() => setLogin(false)}/>
            </Modal>
        </Wrapper>
    )
}


export default layout