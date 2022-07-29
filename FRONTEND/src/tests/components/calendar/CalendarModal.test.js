//Video 405 con la explicación  de como hacer pruebas en una modal
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import moment from 'moment'
import { act } from '@testing-library/react';

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventUpdateAction, eventClearActiveAction, eventNewAction } from '../../../redux/ducks/calendarDucks';
import { showMessage } from '../../../helpers/messages';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

jest.mock('../../../redux/ducks/calendarDucks', () => ({
    eventUpdateAction: jest.fn(),
    eventClearActiveAction: jest.fn(),   //Sale un error si no lo coloco. Explicación video 406 Min 3:30
    eventNewAction: jest.fn()
}))

jest.mock('../../../helpers/messages', () => ({
    showMessage: jest.fn(),
}))


const startEvent = moment().minutes(0).seconds(0).add(1, 'hours')
const endEvent = startEvent.clone().add(1, 'hours')

const initialState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola mundo',
            notes: 'texto de la nota',
            start: startEvent.toDate(),
            end: endEvent.toDate()
        }
    },
    auth: {
        uid: 'uid123',
        nombre: 'nombre_test'
    },
    ui: {
        modalOpen: true
    }
}

const store = mockStore(initialState)
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
)

describe('Pruebas en <CalendarModal />', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })
    
    test('Debe mostrar el modal', () => {
        const modal = wrapper.find('Modal').prop('isOpen')
        expect( modal).toBe(true)
    });

    test('Debe de llamar la acción de actualizar y cerrar modal', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect( eventUpdateAction ).toHaveBeenCalledWith( initialState.calendar.activeEvent )
        expect( eventClearActiveAction ).toHaveBeenCalledWith()
    });

    test('Debe mostrar error si falta el titulo', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect( wrapper.find('input[name="title"]').hasClass('is-invalid') ).toBe(true)
    });

    test('Debe crear un nuevo evento', () => {
        const initialState = {
            calendar: {
                events: [],
                activeEvent: null
            },
            auth: {
                uid: 'uid123',
                nombre: 'nombre_test'
            },
            ui: {
                modalOpen: true
            }
        }
        
        const store = mockStore(initialState)
        store.dispatch = jest.fn()
        
        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal />
            </Provider>
        )

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Titulo de Prueba'
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect( eventNewAction ).toHaveBeenCalledWith({
            "end": expect.anything(), 
            "notes": "", 
            "start": expect.anything(), 
            "title": "Titulo de Prueba"
        })

        expect( eventClearActiveAction ).toHaveBeenCalledWith()

    });

    test('Debe validar las fechas', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Titulo de Prueba2'
            }
        })

        const hoy = new Date()

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy)
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect( showMessage ).toHaveBeenCalledWith("error", null, "Fecha fin debe ser mayor a fecha inicio")
    });
});