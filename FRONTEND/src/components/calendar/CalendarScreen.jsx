import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
//-----------------------------
import { Navbar } from '../ui/Navbar'
import { calendarConfig } from '../../helpers/calendar-config'
import CalendarEvent from './CalendarEvent'
import { useState } from 'react'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { openModalAction } from '../../redux/ducks/uiDucks'
import { eventActiveAction, eventClearActiveAction, eventLoadAction } from '../../redux/ducks/calendarDucks'
import { FloatButton } from '../ui/FloatButton'
import { useEffect } from 'react'


//--------------------------------------
moment.locale('es')
const localizer = momentLocalizer(moment) // or globalizeLocalizer


//--------------------------------------
export const CalendarScreen = () => {

    const [view, setView] = useState(localStorage.getItem('lastView') || 'month')
    const dispatch = useDispatch()
    const { events } = useSelector(state => state.calendar)
    const { uid } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(eventLoadAction())
    }, [dispatch])

    //Explicación video 305 min 4:12
    const eventStyle = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: (uid === event.usuario._id) ? '#F70776' : '#FDB44B',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return {
            style
        }
    }

    const doubleClick = (e) => {
        console.log('doubleClick: ');
        dispatch(openModalAction())
    }

    const onSelectEvent = (e) => {
        console.log('evento Seleccionado: ');
        dispatch(eventActiveAction(e))
    }

    const onViewChange = (view) => {
        console.log('onViewChange: ', view);
        setView(view)
        localStorage.setItem('lastView', view)
    }

    const onSelectSlot = (e) => {
        console.log('onSelectSlot: ');
        dispatch(eventClearActiveAction())
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={calendarConfig}
                eventPropGetter={eventStyle}
                onDoubleClickEvent={doubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={view}
                components={{
                    event: CalendarEvent
                }}
            />

            <FloatButton />

            <CalendarModal />
        </div>
    )
}
