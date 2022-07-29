import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader } from "../components/ui/Loader";
import { authCheckAction } from "../redux/ducks/authDucks";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

    const { checking, uid } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        //Valida que el usuario esté autenticado
        dispatch(authCheckAction())
    }, [dispatch])

    if (checking) {
        return <Loader />
    }

    return (
        <BrowserRouter>
            <Routes>
                {uid && <Route path="/*" element={<PrivateRoute />} />}
                {!uid && <Route path="/*" element={<PublicRoute />} />}
            </Routes>
        </BrowserRouter>
    )
}


//Información importante sobre react-router-dom V6 
//https://reactrouter.com/docs/en/v6/upgrading/v5

//Ajustar Redirect:
//https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb
//https://stackoverflow.com/questions/67050966/how-to-build-a-404-page-with-react-router-dom-v6

