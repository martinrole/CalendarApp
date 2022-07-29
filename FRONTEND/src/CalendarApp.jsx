import { Provider } from "react-redux"
import { store } from "./redux/store"
import { AppRouter } from "./routers/AppRouter"

export const CalendarApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
