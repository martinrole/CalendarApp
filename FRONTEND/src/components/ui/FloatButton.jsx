import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { eventDeleteAction } from "../../redux/ducks/calendarDucks"
import { openModalAction } from "../../redux/ducks/uiDucks"


export const FloatButton = () => {

    const { activeEvent } = useSelector(state => state.calendar)

    const dispatch = useDispatch()

    const createEvent = () => {
        dispatch(openModalAction())
    }

    const deleteEvent = () => {
        dispatch(eventDeleteAction())
    }

    if (activeEvent === null) {
        //Crear evento
        return (
            <button className="btn btn-primary fab" onClick={createEvent}>
                <i className="fas fa-plus"></i>
            </button>
        )
    } else {
        //Eliminar evento
        return (
            <button className="btn btn-danger fab" onClick={deleteEvent}>
                <i className="fas fa-trash"></i>
            </button>
        )
    }
}
