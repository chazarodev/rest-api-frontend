import React from 'react'
import { Route, Switch } from "react-router-dom";

import Clientes from '../clients/Clientes';
import Productos from '../productos/Productos';
import Pedidos from '../pedidos/Pedidos';

const Main = () => {
    return (  
        <main className="caja-contenido col-9">
            <Switch>
                <Route exact path="/" component={Clientes} />
                <Route exact path="/productos" component={Productos} />
                <Route exact path="/pedidos" component={Pedidos} />
            </Switch>
        </main>
    );
}
 
export default Main;