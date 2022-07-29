

//1- initialState:
export const initialState = {
    modalOpen: false
}

//2 - Types:
export const types = {
    uiOpenModal: '[uiDucks] Open Modal',
    uiCloseModal: '[uiDucks] Close Modal'
}


//3 - Reducer:
export const uiReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.uiOpenModal:
            return { ...state, modalOpen: true }
        case types.uiCloseModal:
                return { ...state, modalOpen: false }
    
        default:
            return state;
    }
}

//4 - Actions:
export const openModalAction = () => ({
    type: types.uiOpenModal
})

export const closeModalAction = () => ({
    type: types.uiCloseModal
})