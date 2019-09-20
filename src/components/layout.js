import React from 'react'
import styled from 'styled-components';

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

const Tool = styled.li`
    padding: 1rem 0;
    font-size: .8rem;
    border-bottom: 1px solid rgba(255,255,255,.1);
    text-align: center;
    color: rgba(255,255,255,.2);
    font-variant: small-caps;
    
`

const layout = ({children}) => (
    <Wrapper>
        <Toolbar>
            <ul>
                <Tool>home</Tool>
                <Tool>mode</Tool>
                <Tool>utils</Tool>
            </ul>
        </Toolbar>
        <MainContent>
            {children}
        </MainContent>
    </Wrapper>
)

export default layout