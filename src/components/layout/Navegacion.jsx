import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {CRMContext} from '../../context/CRMContext';

const Navegacion = () => {

    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) return null;

    return (  
        <aside className="sidebar col-3">
            <h2>Administracion</h2>
            {auth.auth ? (
                <nav className="navegacion">
                    <Link to={"/"} className="clientes">Clientes</Link>
                    <Link to={"/productos"} className="productos">Productos</Link>
                    <Link to={"/pedidos"} className="pedidos">Pedidos</Link>
                </nav>
            ): null}
        </aside>
    );
}
 
export default Navegacion;