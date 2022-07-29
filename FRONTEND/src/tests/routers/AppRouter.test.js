import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { AppRouter } from '../../routers/AppRouter';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Pruebas en <AppRouter />', () => {
    
    test('Debe mostrar el Loading', () => {

        const initialState = {
            auth: {
                checking: true
            }
        }

        const store = mockStore(initialState)

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )
        
        expect(wrapper).toMatchSnapshot()
        expect( wrapper.find('span').exists() ).toBe(true)
    });

    test('Debe mostrar ruta pública', () => {

        const initialState = {
            auth: {
                checking: false,
                uid: null
            }
        }

        const store = mockStore(initialState)

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )
        
        expect(wrapper).toMatchSnapshot()
        expect( wrapper.find('h2').exists() ).toBe(true)
    });

    test('Debe mostrar ruta privada', () => {

        const initialState = {
            ui: {
                modalOpen: false
            },
            calendar: {
                events: []
            },
            auth: {
                checking: false,
                uid: 'abc1234'
            }
        }

        const store = mockStore(initialState)

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )
        
        //expect(wrapper).toMatchSnapshot()
        expect( wrapper.find('.calendar-screen').exists() ).toBe(true)
    });



})
