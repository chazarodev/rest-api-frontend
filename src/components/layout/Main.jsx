import React from 'react'
import { Route, Switch } from "react-router-dom";

import Clientes from '../clients/Clientes';
import Productos from '../productos/Productos';
import Pedidos from '../pedidos/Pedidos';
import NuevoCliente from '../clients/NuevoCliente';
import EditarCliente from '../clients/EditarCliente';

const Main = () => {
    return (  
        <main className="caja-contenido col-9">
            <Switch>
                <Route exact path="/" component={Clientes} />
                <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                <Route exact path="/clientes/editar/:id" component={EditarCliente} />
                <Route exact path="/productos" component={Productos} />
                <Route exact path="/pedidos" component={Pedidos} />
            </Switch>
        </main>
    );
}
 
export default Main;