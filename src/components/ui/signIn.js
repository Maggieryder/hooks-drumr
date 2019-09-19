import React, { useState, useEffect } from 'react';
import { useAuth } from "../../hooks/useAuth.js";
import useLoginForm from '../../hooks/useLoginForm'

import classes from './ui.module.scss'

const SignIn = ({ modalClosed }) => {

    const [isSignup, setIsSignup] = useState(false)

    const { signup, signin, error, user } = useAuth()

    useEffect(()=> {
        console.log('ERROR', error)
        if ( user && !error) modalClosed()
      }, [error, user])

    const signupCallback = () => { 
        if (inputs.password === inputs.password2){
            alert(`User Created!
             Email: ${inputs.email}`);
             signup(inputs.email, inputs.password)
            //  if(!error) modalClosed() 
        } else {
            alert('Paswords dont match!')
        }    
    }

    const signinCallback = () => { 
        signin(inputs.email, inputs.password)
        // if(!error) modalClosed() 
    }

    const feilds = {email: '', password: '', password2: '' }

    const callback = isSignup ? signupCallback : signinCallback

    const {inputs, handleInputChange, handleSubmit} = useLoginForm(feilds, callback)

    return (

        <form onSubmit={handleSubmit} style={{width: '300px'}}>
            <div>
                <p className={classes.error} style={{display: error ? 'block' : 'none'}}>{error ? error.message : null}</p>
                {/* <div className={classes['form-control']}>
                    <input type='text' name='username' placeholder='User Name' onChange={handleInputChange} value={inputs.username} required />
                </div> */}
                <div className={classes['form-control']}>
                    <input className={classes.input} type='email' name='email' placeholder='Email Address' onChange={handleInputChange} value={inputs.email} required />
                </div>
                <div className={classes['form-control']}>
                    <input className={classes.input} type='password' name='password' placeholder='Password' onChange={handleInputChange} value={inputs.password} required/>
                </div>
                { 
                    isSignup && <div className={classes['form-control']} >
                        <input className={classes.input} type='password' name='password2' placeholder='Re-enter Password' onChange={handleInputChange} value={inputs.password2} required/>
                    </div>
                }
                <hr/>
                <div className={classes['form-control']}>
                    <button className={classes.btn} type='submit'>{isSignup ? 'Sign Up' : 'Sign In'}</button>
                </div>
                { !isSignup && 
                    <>
                        <p style={{marginTop: '1rem'}}>Don't have an account? </p>
                        <div className={classes['form-control']}>
                            <button className={classes.btn} type='button' onClick={() => setIsSignup(true)}>Sign Up</button>
                        </div> 
                    </>
                }
            </div> 
        </form>

    )
}

export default SignIn