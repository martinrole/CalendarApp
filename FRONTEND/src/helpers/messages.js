import Swal from 'sweetalert2'

export const loadingMessage = (state) => {

    if (state) {
        Swal.fire({
            html: 'Cargando',
            didOpen: () => {
                Swal.showLoading()
            }
        })
    } else {
        Swal.close()
    }
}

export const showMessage =(icon,title, text) => {
    Swal.fire({
        icon,
        title,
        text
    })
}