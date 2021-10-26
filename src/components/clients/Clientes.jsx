import React, {useEffect, useState, Fragment, useContext} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

//Importar cliente axios
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';
//Importar el context
import {CRMContext} from '../../context/CRMContext';

function Clientes({history}) {

    //Trabajar con el state
    //clientes = state, guardarClientes = funcion para guardar el state
    const [clientes, guardarClientes] = useState([]);

    //Utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    
    //use effect es similar a componentDidMount y willMount
    useEffect(() => {
        
        if (auth.token !== '') {
            //Query a la api
            const consultarAPI = async () => {
                try {
                    const clientesConsulta = await clienteAxios.get('/clientes', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });

                    //Colocar el resultado en el state
                    guardarClientes(clientesConsulta.data);

                } catch (error) {
                    //Error con la autorización
                    if (error.response.status === 500) {
                        history.push('/iniciar-sesion');
                    }
                }     
            }
            consultarAPI();
        } else {
            history.push('/iniciar-sesion');
        }
    }, [clientes]);

    if(!auth.auth) {
        history.push('/iniciar-sesion');
    }

    //Spinner de carga
    if (!clientes.length) return <Spinner />

    return (
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {clientes.map(cliente => (
                    <Cliente
                        key={cliente._id} 
                        cliente={cliente}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default withRouter(Clientes);