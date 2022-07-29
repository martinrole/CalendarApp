import { Routes, Route, Navigate } from "react-router-dom";
import { CalendarScreen } from "../components/calendar/CalendarScreen";


export const PrivateRoute = () => {
    console.log('PrivateRoute');

    return (
        <Routes>
            <Route path="/calendar" element={<CalendarScreen />} />
            <Route path="/*" element={<Navigate to="/calendar" />} />
        </Routes>
    )
}
