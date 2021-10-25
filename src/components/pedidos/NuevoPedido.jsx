import React, {useState, useEffect, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router';

function NuevoPedido(props) {

    //Extraer id del cliente
    const {id} = props.match.params;

    //State
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);

    //Obtener el cliente
    const consultarAPI = async () => {
        //consultar el cliente actual
        const resultado = await clienteAxios.get(`/clientes/${id}`);
        guardarCliente(resultado.data);
    }

    useEffect(() => {
        consultarAPI();

        //Actualizar el total
        actualizarTotal();
        // eslint-disable-next-line
    }, [productos])

    //Funciones para formbuscarproducto
    const buscarProducto = async e => {
        e.preventDefault();
        //Obtener los productos de la búsqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
        
        //Si no hay resultado mandar alerta, contrario mandarlo al state
        if (resultadoBusqueda.data[0]) {
            let productoResultado = resultadoBusqueda.data[0];
            //Agregar la llave del producto (copia Id)
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;

            //Poner producto en el state
            guardarProductos([
                ...productos,
                productoResultado
            ])

        } else {
            //No hay resultados
            Swal.fire({
                icon: 'error',
                title: 'No hubo resultados',
                text: 'Intente buscar de nuevo'
            })
        }
    }

    //Almacenar un búsqueda en el state
    const leerDatosBusqueda = e => {
        const {target: {value}} = e;
        guardarBusqueda(value);
    }

    //Actualizar la cantidad de productos
    const restarProductos = i => {
        //Copiar el arreglo original
        const todosProductos = [...productos];

        //Validar si está en 0 no puede seguir restando
        if (todosProductos[i].cantidad === 0) return;

        //decremento
        todosProductos[i].cantidad--;

        //Almacenarlo en el state
        guardarProductos(todosProductos);
    }
    const aumentarProductos = i => {
        //Copiar el arreglo
        const todosProductos = [...productos];

        //incremento
        todosProductos[i].cantidad++;

        //colocarlo en el state
        guardarProductos(todosProductos);
    }

    //Eliminar un producto de state
    const eliminarProductoPedido = id => {
        const todosProductos = productos.filter(producto => producto.producto !== id);
        guardarProductos(todosProductos);
    }

    //Actualizar el total a pagar
    const actualizarTotal = () => {
        //Si el arreglo es === 0 total = 0
        if (productos.length === 0) {
            guardarTotal(0);
            return;
        }

        //Calcular nuevo total
        let nuevoTotal = 0;

        //Recorrer el arreglo de productos, sus cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        //Almacenar el total
        guardarTotal(nuevoTotal.toFixed(2));
    }

    //Almacena el pedido en la base de datos
    const realizarPedido = async e => {
        e.preventDefault();

        //Extraer el ID
        const {id} = props.match.params;

        //Construir el objeto
        const pedido = {
            cliente: id,
            pedido: productos,
            total
        }
        
        //Almacenarlo en la bd
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

        //Leer resultado
        if (resultado.status === 200) {
            Swal.fire(
                'Correcto!',
                resultado.data.mensaje,
                'success'
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un Error',
                text: 'No se pudo realizar el pedido'
            })
        }

        //Redireccionar
        props.history.push('/pedidos')
    }

    return (  
        <Fragment>
            <h2>Nuevo Pedido</h2>
            <div className="ficha-cliente">
                <h3>Datos Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Teléfono: {cliente.telefono}</p>
            </div>
            <FormBuscarProducto 
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            />
            <ul className="resumen">
                {productos.map((producto, index) => (
                    <FormCantidadProducto 
                        key={producto.producto}
                        producto={producto}
                        restarProductos={restarProductos}
                        aumentarProductos={aumentarProductos}
                        eliminarProductoPedido={eliminarProductoPedido}
                        index={index}
                    />
                ))}
            </ul>
            <p className="total">Total a pagar: <span>$ {total}</span></p>
            {total > 0 ? (
                <form
                    onSubmit={realizarPedido}
                >
                    <input 
                        type="submit" 
                        value="Realizar Pedido" 
                        className="btn btn-verde btn-block"
                    />
                </form>
            ): null}
        </Fragment>
    );
}

export default withRouter(NuevoPedido);