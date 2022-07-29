import { Routes, Route } from "react-router-dom";
import { NotFoundScreen } from '../components/NotFound/NotFoundScreen'
import { LoginScreen } from '../components/auth/LoginScreen'

export const PublicRoute = () => {
    console.log('PublicRoute');

    return (
        <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/*" element={<NotFoundScreen />} />
        </Routes>

    )
}