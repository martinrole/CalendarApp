import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { showMessage } from '../../helpers/messages';
import { useSelector, useDispatch } from 'react-redux';
import { closeModalAction } from '../../redux/ducks/uiDucks';
import { eventClearActiveAction, eventNewAction, eventUpdateAction } from '../../redux/ducks/calendarDucks';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement('#root');
}

const startEvent = moment().minutes(0).seconds(0).add(1, 'hours')
const endEvent = startEvent.clone().add(1, 'hours')

const initEvent = {
    title: '',
    notes: '',
    start: startEvent.toDate(),
    end: endEvent.toDate()
}


//------------------     COMPONENTE:
export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(startEvent.toDate())
    const [dateEnd, setDateEnd] = useState(endEvent.toDate())
    const [titleValid, setTitleValid] = useState(true)

    const { modalOpen } = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.calendar)

    const [formValues, setFormValues] = useState(initEvent)
    const { title, notes, start, end } = formValues
    const dispatch = useDispatch()

    useEffect(() => {

        if (activeEvent) {
            setFormValues(activeEvent)

            const starReset = moment(activeEvent.start).seconds(0).toDate()
            const endReset = moment(activeEvent.end).seconds(0).toDate()

            setDateStart(starReset)
            setDateEnd(endReset)
        } else {
            setFormValues(initEvent)
        }
    }, [activeEvent])

    const closeModal = () => {
        console.log('closeModal: ');
        dispatch(closeModalAction())
        dispatch(eventClearActiveAction())

        //Limpia el form:
        setFormValues(initEvent)
        setDateStart(startEvent.toDate())
        setDateEnd(endEvent.toDate())
    }

    const handleStartDateChange = (e) => {
        setDateStart(e)

        const endDate = moment(e).add(1, 'hours')
        setDateEnd(endDate.toDate())

        setFormValues({
            ...formValues,
            start: e,
            end: endDate.toDate()
        })

    }

    const handleEndDateChange = (e) => {
        setDateEnd(e)

        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const momentStart = moment(start)
        const momentEnd = moment(end)

        if (momentStart.isSameOrAfter(momentEnd)) {
            return showMessage('error', null, 'Fecha fin debe ser mayor a fecha inicio')
        }

        if (!title.trim()) {
            return setTitleValid(false)
        }


        if (activeEvent) {
            //Edita un evento:
            dispatch(eventUpdateAction(formValues))
        } else {
            //TODO: Crea un evento:
            //Sirvió antes de conectar con la base de datos crear un evento ficticio
            // dispatch(eventNewAction({
            //     ...formValues,
            //     id: `${new Date().getTime}&mkhs&b2jkhFRr2f`,
            //     user: {
            //         _id: '123',
            //         name: 'Martin'
            //     }
            // }))

            dispatch(eventNewAction(formValues))
        }


        setTitleValid(true)
        closeModal()

    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
            ariaHideApp={!process.env.NODE_ENV === 'test'}
        >
            <h1> {activeEvent ? 'Editar Evento' : 'Nuevo Evento'} </h1>
            <hr />

            <form className="container" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        className="form-control"
                        format="y-MM-dd h:mm:ss a"
                        amPmAriaLabel="Select AM/PM"
                        onChange={handleStartDateChange}
                        value={dateStart}
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        className="form-control"
                        format="y-MM-dd h:mm:ss a"
                        amPmAriaLabel="Select AM/PM"
                        minDate={dateStart}
                        onChange={handleEndDateChange}
                        value={dateEnd}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Nombre del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <label>Descripción (Opcional)</label>
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>

                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>

    )
}
