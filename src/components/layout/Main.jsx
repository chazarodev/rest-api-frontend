import React from 'react'
import { Route, Switch } from "react-router-dom";
/** Componentes */
import Clientes from '../clients/Clientes';
import Productos from '../productos/Productos';
import Pedidos from '../pedidos/Pedidos';
import NuevoCliente from '../clients/NuevoCliente';
import EditarCliente from '../clients/EditarCliente';
import EditarProducto from '../productos/EditarProducto';
import NuevoProducto from '../productos/NuevoProducto';
import NuevoPedido from '../pedidos/NuevoPedido';
import Login from '../auth/Login';

const Main = () => {
    return (  
        <main className="caja-contenido col-9">
            <Switch>
                <Route exact path="/" component={Clientes} />
                <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                <Route exact path="/clientes/editar/:id" component={EditarCliente} />
                <Route exact path="/productos" component={Productos} />
                <Route exact path="/productos/nuevo" component={NuevoProducto} />
                <Route exact path="/productos/editar/:id" component={EditarProducto} />
                <Route exact path="/pedidos" component={Pedidos} />
                <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
                <Route exact path="/iniciar-sesion" component={Login} />
            </Switch>
        </main>
    );
}
 
export default Main;