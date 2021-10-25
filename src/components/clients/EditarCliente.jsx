import React, {Fragment, useState, useEffect} from 'react';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router';
import Swal from 'sweetalert2';

function EditarCliente(props) {

    //Obtener el id
    const {id} = props.match.params

    //Cliente =  state. datosCliente = función para guardar el state
    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: '',
    });

    //Query a la API
    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

        //Colocar en el state
        datosCliente(clienteConsulta.data)
    }

    //UseEffect cuando el componente carga
    useEffect(() => {
        consultarAPI();
        // eslint-disable-next-line
    }, [])

    //Leer los datos del formulario
    const actualizarState = e => {
        const { target: {name} } = e;
        const { target: {value} } = e;
        //Almacenar el objeto en el state
        datosCliente({
            //Obtener una copia del state actual
            ...cliente,
            [name]: value
        });
    }

    //Enviar peticion por axios para actualizar al cliente
    const actualizarCliente = e => {
        e.preventDefault();

        //Enviar petición
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res => {
                //Validar si hay errores de mongo
                if (res.data.code === 11000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un Error!',
                        text: 'El correo ya fue registrado',
                    })
                } else {
                    Swal.fire(
                        'Correcto',
                        'Cliente Actualizado!',
                        'success'
                    )
                }
                //Redireccionar
                props.history.push('/');
            });
    }

    //Validar el formulario
    const validarCliente = () => {
        //Desctructuring
        const {nombre, apellido, empresa, email, telefono} = cliente;

        //Revisar que las propiedades del objeto tengan contenido
        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        //Retorna true o false
        return valido;
    }

    return (
        <Fragment>
            <h2>Editar Cliente</h2>
            <form
                onSubmit={actualizarCliente}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Escribe tu nombre" 
                        value={cliente.nombre}
                        onChange = {actualizarState}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="apellido">Apellido</label>
                    <input 
                        type="text" 
                        name="apellido" 
                        placeholder="Escribe tu apellido"
                        value={cliente.apellido}
                        onChange = {actualizarState} 
                    />
                </div>
                <div className="campo">
                    <label htmlFor="empresa">Empresa</label>
                    <input 
                        type="text" 
                        name="empresa" 
                        placeholder="Empresa"
                        value={cliente.empresa}
                        onChange = {actualizarState} 
                    />
                </div>
                <div className="campo">
                    <label htmlFor="email">e-mail</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Proporciona un email"
                        value={cliente.email}
                        onChange = {actualizarState} 
                    />
                </div>
                <div className="campo">
                    <label htmlFor="telefono">Teléfono</label>
                    <input 
                        type="tel" 
                        name="telefono" 
                        placeholder="Proporciona un teléfono"
                        value={cliente.telefono}
                        onChange = {actualizarState} 
                    />
                </div>
                <div className="enviar">
                    <input 
                        type="submit" 
                        value="Guardar Cambios" 
                        className="btn btn-azul"
                        disabled={validarCliente()} 
                    />
                </div>
            </form>
        </Fragment>
    );
}

//HOC es una función que toma un componente y retorna un componente nuevo
export default withRouter(EditarCliente);
