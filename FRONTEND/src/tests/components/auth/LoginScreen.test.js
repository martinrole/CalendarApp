import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { loginAction, registerAction } from '../../../redux/ducks/authDucks';
import { showMessage } from '../../../helpers/messages';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {}

const store = mockStore(initialState)
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen />
    </Provider>
)

jest.mock('../../../redux/ducks/authDucks', () => ({
    loginAction: jest.fn(),
    registerAction: jest.fn()
}))

jest.mock('../../../helpers/messages', () => ({
    showMessage: jest.fn()
}))


describe('Prueba en <LoginScreen />', () => {
    
    //Siempre que se utilicen mocks es recomendale hacer un beforeEach:
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Debe mostrar el componente correctamente', () => {
        expect( wrapper ).toMatchSnapshot()
    });

    test('Debe llamar el dispatch del Login', () => {

        wrapper.find('input[name="loginCorreo"]').simulate('change', {
            target: {
                name: 'loginCorreo',
                value: 'correo_test@testing.com'
            }
        })

        wrapper.find('input[name="loginContrasena"]').simulate('change', {
            target: {
                name: 'loginContrasena',
                value: 'password_1234'
            }
        })

        //Explicación video 401 por si algo:
        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        })

        expect( loginAction ).toHaveBeenCalledWith('correo_test@testing.com','password_1234')

    });

    //Explicación video 402:
    test('No hay registro si las contraseñas son diferentes', () => {
        
        wrapper.find('input[name="rContrasena"]').simulate('change', {
            target: {
                name: 'rContrasena',
                value: 'password_123'
            }
        })

        wrapper.find('input[name="rContrasena2"]').simulate('change', {
            target: {
                name: 'rContrasena2',
                value: 'password_123456'
            }
        })

        //Segundo formulario, por eso pongo at(1)
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        })

        expect( showMessage ).toHaveBeenCalledWith("error", null, "Contraseñas no son iguales")
        expect( registerAction ).toHaveBeenCalledTimes(0)
        expect( registerAction ).not.toHaveBeenCalled() //Otra forma de hacerlo
    });

    test('Registrarse un usuario correctamente', () => {
        wrapper.find('input[name="rContrasena"]').simulate('change', {
            target: {
                name: 'rContrasena',
                value: 'password_123'
            }
        })

        wrapper.find('input[name="rContrasena2"]').simulate('change', {
            target: {
                name: 'rContrasena2',
                value: 'password_123'
            }
        })

        //Segundo formulario, por eso pongo at(1)
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        })

        expect( showMessage ).not.toHaveBeenCalled()
        expect( registerAction ).toHaveBeenCalledTimes(1)
        expect( registerAction ).toHaveBeenCalledWith('tobbias23@hotmail.com', 'Tobby', 'password_123')
    });
})