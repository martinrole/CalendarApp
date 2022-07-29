import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import { act } from '@testing-library/react' //Sirve para simular el cambio de estado
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { calendarConfig } from '../../../helpers/calendar-config';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
}))

Storage.prototype.setItem = jest.fn()

const initialState = {
    calendar: {
        events: []
    },
    auth: {
        uid: 'uid123',
        nombre: 'nombre_test'
    },
    ui: {
        modalOpen: false
    }
}

const store = mockStore(initialState)
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
)

//Video explicación 403: Prueebas en CalendarScreen:
describe('Pruebas en <CalendarScreen />', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Debe mostrar componente correctamente', () => {
        //Este puede fallar porq cambia el mes con el tiempo, solo es actualizar el Snapshot
        expect( wrapper ).toMatchSnapshot()
    });

    //Explicaciòn validar componentes de terceros 404:
    test('Pruebas con las interacciones del calendario', () => {
        const calendar = wrapper.find('Calendar')

        //Acà voy a buscar el atributo de calendar llamado messages:
        const msgCalendar = calendar.prop('messages')
        expect ( msgCalendar ).toEqual( calendarConfig )
    })

    test('Prueba en <Calendar /> - onDoubleClickEvent', () => {
        const calendar = wrapper.find('Calendar')

        calendar.prop('onDoubleClickEvent')()
        expect( store.dispatch ).toHaveBeenCalledWith({"type": "[uiDucks] Open Modal"})
    });

    test('Prueba en <Calendar /> - onSelectEvent', () => {
        const calendar = wrapper.find('Calendar')

        calendar.prop('onSelectEvent')({title: 'prueba'})
        expect( store.dispatch ).toHaveBeenCalledWith({
            "payload": {"title": "prueba"}, 
            "type": "[CalendarDucks] Active Event"
        })
    });

    test('Prueba en <Calendar /> - onView', () => {
        const calendar = wrapper.find('Calendar')

        //Ponemos act porque esa instrucción hace la modificación con el setState para que no salga error
        act(() => {
            calendar.prop('onView')('week')
            expect( localStorage.setItem ).toHaveBeenCalledWith('lastView','week')
        })

    });




});