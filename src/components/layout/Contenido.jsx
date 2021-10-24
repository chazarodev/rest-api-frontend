import React from 'react'
import Navegacion from './Navegacion';
import Main from './Main';

const Contenido = () => {
    return (  
        <div className="grid contenedor contenido-principal">
            <Navegacion />
            <Main />
        </div>
    );
}
 
export default Contenido;