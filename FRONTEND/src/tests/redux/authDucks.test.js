import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import { authCheckAction, authReducer, loginAction, logoutAction, registerAction, types }  from '../../redux/ducks/authDucks'
import '@testing-library/jest-dom'
import { showMessage } from '../../helpers/messages';
import * as fetchModule from '../../helpers/fetch';



const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
    checking: true,
}

//ACÀ SE DEBE COLOCAR EL ESTADO DEL STORE COMO DEBERIA ESTAR CUANDO SE VA A HACER LA LLAMADA
let store = mockStore(initialState )
    

const authTypes = {
    checkingFinish: '[authDucks] Checking Finish',
    startLogin: '[authDucks] Start Login',
    login: '[authDucks] Login', //ya
    startRegister: '[authDucks] Start Register',
    startTokenRenew: '[authDucks] Start Token renew',
    logout: '[authDucks] Logout'
}

//Funciones simuladas con jest:
Storage.prototype.setItem = jest.fn()

jest.mock('../../helpers/messages', () => ({
    showMessage: jest.fn()
}))



//Pruebas 
describe('Pruebas en authDucks', () => {

    beforeEach(() => {
        store = mockStore(initialState)
        jest.clearAllMocks()
    })

    test('Los types deben ser iguales', () => {
        expect( types ).toEqual( authTypes )
    })

    test('LoginAction correcto', async () => {
        await store.dispatch( loginAction('martinrole@hotmail.com', 'mar123') )

        const actions = store.getActions()

        expect( actions[0] ).toEqual({
            type: authTypes.login,
            payload: {
                uid: expect.any(String),
                nombre: expect.any(String)
            }
        })

        //Video 391 Min 9 Con explicación.
        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String))
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number))

        //Sirve para extraer el valor con el que fue llamado la función de jest se puede hacer con:
        //token = localStorage.setItem.mock.calls[0][1]
        //console.log(localStorage.setItem.mock.calls)

    });

    test('LoginAction incorrecto', async () => {
        await store.dispatch( loginAction('martinrole@hotmail.com', 'mar1234') )

        const actions = store.getActions()
        expect( actions ).toEqual([])
        expect( showMessage ).toHaveBeenCalledWith("error", null, "Usuario y/o contraseña no son correctos 2")
    });


    test('registerAction correcto', async () => {

        //Explicación video 393: ( Yo lo hago un poco diferente porque mi authFetch hace el json() )
        fetchModule.authFetch = jest.fn( () => ({
                ok: true,
                uid: '123nmkjf2D2c',
                nombre: 'nombre_simulado_jest',
                token: 'ABC123'
            })
        )

        await store.dispatch( registerAction('nuevo_correo_test@test.com','nombre_test','test123') )

        const actions = store.getActions()

        expect( actions[0] ).toEqual({
            type: authTypes.login,
            payload: {
                uid: expect.any(String),
                nombre: expect.any(String)
            }
        })

        expect( actions[0] ).toEqual({
            type: authTypes.login,
            payload: {
                uid: '123nmkjf2D2c',
                nombre: 'nombre_simulado_jest'
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC123')
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number))

    });

    test('logoutAction', async () => {
        await store.dispatch( logoutAction() )
        const actions = store.getActions()
        expect( actions[0] ).toEqual({
            type: authTypes.logout
        })
    });


    test('authCheckAction funcione correctamente', async () => {

        //Explicación video 394: ( Yo lo hago un poco diferente porque mi authFetch hace el json() )
        fetchModule.authFetchToken = jest.fn( () => ({
                ok: true,
                uid: 'uid123',
                nombre: 'nombre_simulado_jest2',
                token: 'ABCD1234'
            })
        )

        await store.dispatch( authCheckAction() )

        const actions = store.getActions()

        expect( actions[0] ).toEqual({
            type: authTypes.login,
            payload: {
                uid: 'uid123',
                nombre: 'nombre_simulado_jest2'
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABCD1234')
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number))
    });

    test('authReducer: Debe retornar el estado por defecto', () => {
        const action = {}
        const state = authReducer(initialState, action )
        expect( state ).toEqual( initialState)
    })

    test('authReducer: Debe autenticar el usuario', () => {
        const action = {
            type: authTypes.login,
            payload: {
                uid: 'uid123',
                nombre: 'nombre_test'
            }
        }
        const state = authReducer( initialState, action )
        expect( state ).toEqual({
            checking: false, 
            nombre: "nombre_test", 
            uid: "uid123"
        })
    })

})