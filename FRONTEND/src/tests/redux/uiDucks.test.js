import { closeModalAction, initialState, openModalAction, uiReducer } from "../../redux/ducks/uiDucks";

describe('uiDucks pruebas', () => {

    test('Debe de abrir modal', () => {
        const modalOpen = openModalAction()
        const state = uiReducer( initialState, modalOpen )
        
        expect( state ).toEqual({
            modalOpen: true
        })
    });

    test('Debe de cerrar modal', () => {
        const modaClose = closeModalAction()
        const state = uiReducer( initialState, modaClose )
        
        expect( state ).toEqual({
            modalOpen: false
        })
    });
})