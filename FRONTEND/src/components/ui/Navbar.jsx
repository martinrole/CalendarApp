import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { logoutAction } from "../../redux/ducks/authDucks";
import { clearCalendarAction } from "../../redux/ducks/calendarDucks";


export const Navbar = () => {

    const { nombre } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login', {
            replace: true
        })

        dispatch(logoutAction())
        dispatch(clearCalendarAction())
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-3">
            <span className="navbar-brand">{nombre}</span>

            <button className="btn btn-outline-danger" onClick={handleLogout}>
                <span>Salir </span>
                <i className="fas fa-sign-out-alt"></i>
            </button>
        </div>
    )
}
