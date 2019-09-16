import axios from 'axios'
import * as types from 'types';

const API_KEY = 'AIzaSyCGtoEmtQgmyMWBbWuG0Incm4TDHjgiRRE'

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${API_KEY}`, authData)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
                dispatch(authFail(error))
            })
    }
}



export const authStart = () => {
    return {
        type: types.AUTH_START
    }
}

export const authSuccess = (data) => {
    return {
        type: types.AUTH_SUCCESS,
        data: data
    }
}

export const authFail = (error) => {
    return {
        type: types.AUTH_FAIL,
        error: error
    }
}