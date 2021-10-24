import React, {Fragment, useState} from 'react';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router';
import Swal from 'sweetalert2';

function NuevoCliente({history}) {

    //Cliente =  state. guardarCliente = función para guardar el state
    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: '',
    });

    //Leer los datos del formulario
    const actualizarState = e => {
        const { target: {name} } = e;
        const { target: {value} } = e;
        //Almacenar el objeto en el state
        guardarCliente({
            //Obtener una copia del state actual
            ...cliente,
            [name]: value
        });
    }

    //Añadir en la Rest API un cliente nuevo
    const agregarCliente = e => {
        e.preventDefault();

        //Enviar petición
        clienteAxios.post('/clientes', cliente)
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
                        'Registro Correcto!',
                        res.data.mensaje,
                        'success'
                    )
                }
                //Redireccionar
                history.push('/');
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
            <h2>Nuevo Cliente</h2>
            <form
                onSubmit={agregarCliente}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Escribe tu nombre" 
                        onChange = {actualizarState}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="apellido">Apellido</label>
                    <input 
                        type="text" 
                        name="apellido" 
                        placeholder="Escribe tu apellido"
                        onChange = {actualizarState} 
                    />
                </div>
                <div className="campo">
                    <label htmlFor="empresa">Empresa</label>
                    <input 
                        type="text" 
                        name="empresa" 
                        placeholder="Empresa"
                        onChange = {actualizarState} 
                    />
                </div>
                <div className="campo">
                    <label htmlFor="email">e-mail</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Proporciona un email"
                        onChange = {actualizarState} 
                    />
                </div>
                <div className="campo">
                    <label htmlFor="telefono">Teléfono</label>
                    <input 
                        type="tel" 
                        name="telefono" 
                        placeholder="Proporciona un teléfono"
                        onChange = {actualizarState} 
                    />
                </div>
                <div className="enviar">
                    <input 
                        type="submit" 
                        value="Agregar Cliente" 
                        className="btn btn-azul"
                        disabled={validarCliente()} 
                    />
                </div>
            </form>
        </Fragment>
    );
}

//HOC es una función que toma un componente y retorna un componente nuevo
export default withRouter(NuevoCliente);
