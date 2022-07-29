const baseUrl = process.env.REACT_APP_API_URL

//Estas funciones se ejecutas dependiendo si es una petición privada o no

//Autenticación sin token
export const authFetch = async ( url, data, method ) => {
    const urlReq = `${baseUrl}/${url}`

    if ( method === 'GET') {
        return await fetch(urlReq)
    }

    const params = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( data )
    }

    try {
        const respuesta = await fetch( urlReq, params)
        return await respuesta.json()

    } catch (error) {
        console.log('error en authFetch: ', error);
        return null
    }
}


//Autenticación con token: Comprueba que el usuario esté logueado y el token vigente:
export const authFetchToken = async ( url, data, method ) => {
    const urlReq = `${baseUrl}/${url}`
    const token = localStorage.getItem('token') || ''
    let params

    if (method === 'GET') {
        params = {
            method,
            headers: {
                'x-token': token
            }
        }
    } else {
        params = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        }
    }


    try {
        const respuesta = await fetch( urlReq, params)
        return await respuesta.json()

    } catch (error) {
        console.log('error en authFetchToken: ', error);
        return null
    }
}