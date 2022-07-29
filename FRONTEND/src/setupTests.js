// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';	//(Este es el adaptador que SI se pondría por reemplazo del de arriba)

//Instalacion de Enzyme to JSON
import {createSerializer} from 'enzyme-to-json';


Enzyme.configure({ adapter: new Adapter() });


//Inicialización del Enzyme to JSON
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

//Explicación video 405 Min 10:00 - Es porque genera error al mostrar un modal en una prueba, orque no lo puede dibujar porque no conoce las dimensiones de la pantalla
HTMLCanvasElement.prototype.getContext = () => {}