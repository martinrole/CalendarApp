import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom' // Solo sirve para tener el prototipado en vsCode
import { FloatButton } from '../../../components/ui/FloatButton';
import { eventDeleteAction } from '../../../redux/ducks/calendarDucks';
import { openModalAction } from '../../../redux/ducks/uiDucks';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)


jest.mock('../../../redux/ducks/calendarDucks', () => ({
    eventDeleteAction: jest.fn()
}))

jest.mock('../../../redux/ducks/uiDucks', () => ({
    openModalAction: jest.fn()
}))


describe('Pruebas en componente <FloatButton />', () => {
    
    test('Debe mostrar FloatButton de eliminar evento', () => {

        const initialState = {
            calendar: {
                events: [],
                activeEvent: {
                    title: 'tituloNota',
                    start: 12433543,
                    end: 32544565,
                    id: 'idNota123'
                }
            }
        }

        const store = mockStore(initialState)

        const wrapper = mount(
            <Provider store={store}>
                <FloatButton />
            </Provider>
        )

        expect( wrapper ).toMatchSnapshot()
    });

    test('Debe llamar eventDeleteAction', () => {

        const initialState = {
            calendar: {
                events: [],
                activeEvent: {
                    title: 'tituloNota',
                    start: 12433543,
                    end: 32544565,
                    id: 'idNota123'
                }
            }
        }

        const store = mockStore(initialState)
        store.dispatch = jest.fn()

        const wrapper = mount(
            <Provider store={store}>
                <FloatButton />
            </Provider>
        )

        wrapper.find('button').simulate('click')
        expect( eventDeleteAction ).toHaveBeenCalledTimes(1)
    });

    test('Debe mostrar FloatButton de agregar evento', async () => {
        
        const initialState = {
            calendar: {
                events: [],
                activeEvent: null
            }
        }

        const store = mockStore(initialState)

        const wrapper = mount(
            <Provider store={store}>
                <FloatButton />
            </Provider>
        )

        expect( wrapper ).toMatchSnapshot()

    })

    test('Debe llamar createEvent y openModalAction', async () => {
        
        const initialState = {
            calendar: {
                events: [],
                activeEvent: null
            }
        }

        const store = mockStore(initialState)
        store.dispatch = jest.fn()

        const wrapper = mount(
            <Provider store={store}>
                <FloatButton />
            </Provider>
        )

        wrapper.find('button').simulate('click')
        expect( openModalAction ).toHaveBeenCalledTimes(1)
    })

})
