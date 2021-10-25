import React from 'react';

function FormBuscarPedido(props) {
    return (  
        <form
            onSubmit={props.buscarProducto}
        >
            <legend>Busca un producto y agrega una cantidad</legend>
            <div className="campo">
                <label htmlFor="productos">Productos:</label>
                <input 
                    type="text" 
                    name="productos" 
                    placeholder="Nombre Productos" 
                    onChange={props.leerDatosBusqueda}    
                />
            </div>
            <input type="submit" value="Buscar Producto" className="btn btn-azul btn-block" />
        </form>
    );
}

export default FormBuscarPedido;