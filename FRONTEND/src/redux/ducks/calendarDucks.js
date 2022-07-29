import { adjustEventsDate } from "../../helpers/calendar-config"
import { authFetchToken } from "../../helpers/fetch"
import { showMessage } from "../../helpers/messages"




// Lo use para antes de conectar con la base de datos:
// const initialState = {
//     events: [
//         {
//             id: 'sdsd&hnsd56gGRf123bSD',
//             title: 'PruebaReducer',
//             start: moment().toDate(),     //Sinónimo de new Date() de JavaScript
//             end: moment().add(1, 'hours').toDate(),
//             allDay: false,
//             notes: 'acá van las notas',
//             user: {
//                 _id: '12dsfv324D',
//                 nombre: 'Martin User'
//             }
//         }
//     ],
//     activeEvent: null
// }

//1- initialState:
const initialState = {
    events: [],
    activeEvent: null
}

//2 - Types:
const types = {
    eventNew: '[CalendarDucks] Add Event',
    eventList: '[CalendarDucks] List Event',
    eventActive: '[CalendarDucks] Active Event',
    eventClearActive: '[CalendarDucks] Clear Active Event',
    eventUpdate: '[CalendarDucks] Updated Event',
    eventDelete: '[CalendarDucks] Delete Event',
    clearCalendar: '[CalendarDucks] Clear All Calendar'
}

//3 - Reducer:
export const calendarReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.eventActive:
            return { 
                ...state, 
                activeEvent: action.payload 
            }
        case types.eventClearActive:
            return { 
                ...state, 
                activeEvent: null 
            }
        case types.eventNew:
            return { 
                ...state, 
                events: [...state.events, action.payload]
            }
        case types.eventList:
            return {
                ...state, 
                events: [ ...action.payload ] 
            }
        case types.eventUpdate:
            return {
                ...state, 
                events: state.events.map( event => event.id === action.payload.id ? action.payload : event )
            }
        case types.eventDelete:
            return {
                ...state, 
                events: state.events.filter( event => event.id !== state.activeEvent.id ),
                activeEvent: null
            }
        case types.clearCalendar:
            return {
                ...initialState
            }
        default:
            return state;
    }
}

//4 - Actions:
export const eventNewAction = ( event ) => async ( dispatch, getState ) => {
    
    const { uid, nombre } = getState().auth

    try {   
        const res = await authFetchToken('events/create', event, 'POST')

        const evento = {
            id: res.evento.id,
            ...event,
            usuario: {
                _id: uid,
                nombre
            }
        }
    
        if ( res.ok ) {
            dispatch({
                type: types.eventNew,
                payload: evento
            })
        }

    } catch (error) {
        console.log('error en eventNewAction', error);
        
    }
}


export const eventLoadAction = () => async ( dispatch, getState ) => {

    try {
        const { ok, eventos } = await authFetchToken('events/', null, 'GET')
        
        if (ok) {        
            const events = adjustEventsDate( eventos )
            dispatch({
                type: types.eventList,
                payload: events
            })
        }

    } catch (error) {
        console.log('error en eventLoadAction', error);
        
    }
}

export const eventUpdateAction = ( event ) => async (dispatch, getState ) => {

    try {
        const { ok, msg } = await authFetchToken(`events/${event.id}`, event, 'PUT')

        if ( ok ) {
            dispatch({
                type: types.eventUpdate,
                payload: event
            })
        } else {
            //Solo se pueden editar los eventos propios del user
            showMessage('error', null, msg)
        }

    } catch (error) {
        console.log('eventUpdateAction', error);
        
    }
}

export const eventDeleteAction = () => async (dispatch, getState ) => {

    try {
        const { id } = getState().calendar.activeEvent
        const { ok, msg } = await authFetchToken(`events/${id}`, {}, 'DELETE')

        if ( ok ) {
            dispatch({
                type: types.eventDelete
            })
        } else {
            showMessage('error', null, msg)
        }

    } catch (error) {
        console.log('error eventDeleteAction', error);   
    }
    
}

export const clearCalendarAction = () => (dispatch, getState ) => {
    console.log('clearCalendarAction: ', clearCalendarAction);
    dispatch({
        type: types.clearCalendar
    })
}

export const eventActiveAction = ( event ) => ({
    type: types.eventActive,
    payload: event
})

export const eventClearActiveAction = () => ({
    type: types.eventClearActive
})
