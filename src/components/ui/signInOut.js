import React from 'react';
import auth from '../../hooks/useAuth';

const SignInOut = ({user, handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        {!user && <div>
            <div className='form-control'>
                <input type='email' name='email' placeholder='Email Address' required />
            </div>
            <div className='form-control'>
                <input type='password' name='password' placeholder='Password' required/>
            </div>
        </div>}
        <button type='submit'>{user ? 'Sign Out' : 'Sign In'}</button>
    </form>
)

export default SignInOut