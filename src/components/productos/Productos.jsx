import React, {Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner';

function Productos() {

    //Productos=state, guardarProducto=función para guardar el state
    const [productos, guardarProductos] = useState([]);

    //Query a la API
    const consultarAPI = async () => {
        const productosConsulta = await clienteAxios.get('/productos');
        guardarProductos(productosConsulta.data);
    }

    //useEffect para consultar la API al cargar
    useEffect(() => {
        //Llamado a la API
        consultarAPI();
    }, [productos]);

    //Spinner de carga
    if (!productos.length) return <Spinner />

    return (
        <Fragment>
            <h2>Productos</h2>
            <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>
            <ul className="listado-productos">
                {productos.map(producto => (
                    <Producto 
                        key={producto._id}
                        producto={producto}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Productos;