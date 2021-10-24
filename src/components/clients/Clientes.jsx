import React, {useEffect} from 'react';

//Importar cliente axios
import clienteAxios from '../../config/axios';

function Clientes() {

    //Query a la api
    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes')
        console.log(clientesConsulta);
    }

    //use effect es similar a componentDidMount y willMount
    useEffect(() => {
        consultarAPI();
    })

    return (
        <h2>Clientes</h2>
    );
}

export default Clientes;