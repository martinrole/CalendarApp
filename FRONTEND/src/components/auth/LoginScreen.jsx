import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux'
import './login.css';
import { loginAction, registerAction } from '../../redux/ducks/authDucks';
import { showMessage } from '../../helpers/messages';

export const LoginScreen = () => {

    //useForm:
    const initialForm = {
        loginCorreo: 'martinrole@hotmail.com',
        loginContrasena: 'mar123',
        rNombre: 'Tobby',
        rCorreo: 'tobbias23@hotmail.com',
        rContrasena: 'soyTobby1a',
        rContrasena2: 'soyTobby1a',
    };
    const [formValues, handleInputChange] = useForm(initialForm);
    const { loginCorreo, loginContrasena, rNombre, rCorreo, rContrasena, rContrasena2 } = formValues

    //dispatch:
    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()

        dispatch(loginAction(loginCorreo, loginContrasena))
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (rContrasena !== rContrasena2) {
            return showMessage('error', null, 'Contraseñas no son iguales')
        }

        dispatch(registerAction(rCorreo, rNombre, rContrasena))
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="loginCorreo"
                                className="form-control"
                                placeholder="Correo"
                                value={loginCorreo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="loginContrasena"
                                className="form-control"
                                placeholder="Contraseña"
                                value={loginContrasena}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Ingresar"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="rNombre"
                                className="form-control"
                                placeholder="Nombre"
                                value={rNombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="rCorreo"
                                className="form-control"
                                placeholder="Correo"
                                value={rCorreo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="rContrasena"
                                className="form-control"
                                placeholder="Contraseña"
                                value={rContrasena}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                name="rContrasena2"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                value={rContrasena2}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}