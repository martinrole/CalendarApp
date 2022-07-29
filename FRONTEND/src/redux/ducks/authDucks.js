import { authFetch, authFetchToken } from "../../helpers/fetch";
import { showMessage } from "../../helpers/messages";


//1- initialState:
const initialState = {
    checking: true,
}

//2 - Types:
export const types = {
    checkingFinish: '[authDucks] Checking Finish',
    startLogin: '[authDucks] Start Login',
    login: '[authDucks] Login',
    startRegister: '[authDucks] Start Register',
    startTokenRenew: '[authDucks] Start Token renew',
    logout: '[authDucks] Logout'
}


//3 - Reducer:
export const authReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.login:
            return { 
                ...state, 
                ...action.payload,
                checking: false
            }
        case types.checkingFinish:
            return {
                ...state,
                checking: false
            }
        case types.logout:
            return {
                checking: false
            }
    
        default:
            return state;
    }
}

//4 - Actions:

//Primera forma de hacer:
// export const loginAction = ( correo, contrasena ) => {
//     return async ( dispatch ) => {
//         console.log('haber', correo, contrasena);
//     }
// }

//Segunda forma de hacerlo:
export const loginAction = ( correo, contrasena ) => async ( dispath, getState ) => {
    const data = { correo, contrasena }
    const { uid, nombre, token, ok, msg } = await authFetch('auth', data, 'POST')
    
    if ( ok ) {
        localStorage.setItem('token',token)
        localStorage.setItem('token-init-date', new Date().getTime())

        dispath({
            type: types.login,
            payload: {
                uid,
                nombre
            }
        })

    } else {
        showMessage('error', null, msg )
    }

}

export const registerAction = ( correo, name, contrasena ) => async ( dispath, getState) => {

    const data = { correo, nombre: name, contrasena }
    const { uid, nombre, token, ok, msg } = await authFetch('auth/create', data, 'POST') 

    if ( ok ) {
        localStorage.setItem('token',token)
        localStorage.setItem('token-init-date', new Date().getTime())

        dispath({
            type: types.login,
            payload: {
                uid,
                nombre
            }
        })

        showMessage('success', 'Bienvenido','Registro exitoso')

    } else {
        showMessage('error', null, msg )
    }
}

export const authCheckAction = () => async ( dispath, getState) => {

    const res = await authFetchToken('auth/updateToken', null , 'GET')
    
    if ( res.ok ) {
        localStorage.setItem('token',res.token)
        localStorage.setItem('token-init-date', new Date().getTime())

        dispath({
            type: types.login,
            payload: {
                uid: res.uid,
                nombre: res.nombre
            }
        })

    } else {
        dispath({
            type: types.checkingFinish
        })
    }
}

export const logoutAction = () =>  (dispath, getState) => {
    dispath({
        type: types.logout
    })
    
    localStorage.clear()
}