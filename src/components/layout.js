import React from 'react'
import Toolbar from './ui/toolbar';
import Modal from './ui/modal'
import Login from './ui/login'

import { useAuth } from "../hooks/useAuth.js";

import { ViewsProvider } from "../context/ViewsContext"

const layout = ({children}) => {

    const auth = useAuth();
    
    return (
        <div className='wrapper'>
            <ViewsProvider>
                <Toolbar/>
                <div className='main-container'>
                    {children}
                </div>
                <Modal show={auth.login} modalClosed={() => auth.setLogin(false)}>
                    <Login modalClosed={() => auth.setLogin(false)}/>
                </Modal>
            </ViewsProvider>
            
        </div>
    )
}


export default layout