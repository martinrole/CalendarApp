import { authFetch, authFetchToken } from "../../helpers/fetch";

describe('Pruebas en el helper Fetch', () => {
    
    let token = ''

    //Explicación video 389
    test('Fetch debe funcionar correctamente', async () => {
        
        const data = {
            correo: 'martinrole@hotmail.com',
            contrasena: 'mar123'
        }

        const resp = await authFetch('auth', data, 'POST')  
        token = resp.token

        expect( resp.ok ).toBe(true)
    });

    test('FetchToken debe funcionar correctamente', async () => {

        localStorage.setItem('token', token)

        const data = {
            "title": "Test Event",
            "notes": "Nota enviada desde test",
            "start": 1150000,
            "end": 125000
        }

        const resp = await authFetchToken('events/create', data, 'POST' )
        expect( resp.ok ).toBe(true)
        expect( resp.msg ).toEqual('Evento creado')
    });
})
