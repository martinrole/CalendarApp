import { useNavigate } from "react-router-dom"

export const NotFoundScreen = () => {

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login', { replace: true })
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div>
                <h1 className="text-center text-danger">404</h1>
                <h2 className="mb-4">Ops! Page Not Found</h2>
                <button className="btn btn-primary btn-block" onClick={handleLogin}>Ingresar</button>
            </div>
        </div>
    )
}
