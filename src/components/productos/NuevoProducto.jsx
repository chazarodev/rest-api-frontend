import React, {Fragment, useState} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router';

function NuevoProducto({history}) {

    //producto=state, guardarProducto=función que actualiza el state
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '' 
    });
    //Archivo=state, guardarArchivo= setState
    const [archivo, guardarArchivo] = useState('');

    //Almacena nuevo producto en la base de datos
    const agregarProducto = async (e) => {
        e.preventDefault();

        //Crear un form-data
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        //Almacenar en la base de datos
        try {
            const res = await clienteAxios.post('/productos', formData, {
                headers: {
                    'Content-Type': 'Multipart/form-data'
                }
            });
            //Lanzar alert
            if (res.status === 200) {
                Swal.fire(
                    'Agregado correctamente',
                    `${res.data.mensaje}: ${producto.nombre} `,
                    'success'
                );
            }
            //Redireccionar
            history.push('/productos');
        } catch (error) {
            console.log(error);
            //lanzar alerta
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    //Leer los datos del formulario
    const leerInformacionProducto = e => {
        const {target: {name}} = e;
        const {target: {value}} = e;
        guardarProducto({
            //Obtener una copia del state
            ...producto,
            [name]: value
        });
    }

    //Coloca la imagen en el state
    const leerArchivo = e => {
        const {target: {files}} = e;
        guardarArchivo(files[0]);
    }

    return (  
        <Fragment>
            <h2>Nuevo Producto</h2>
            <form
                onSubmit={agregarProducto}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre del Producto" 
                        onChange={leerInformacionProducto}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="precio">Precio:</label>
                    <input 
                        type="number" 
                        name="precio" 
                        min="0.00" 
                        step="0.01" 
                        placeholder="Precio" 
                        onChange={leerInformacionProducto}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="imagen">Imagen:</label>
                    <input 
                        type="file" 
                        name="imagen"
                        onChange={leerArchivo} 
                    />
                </div>
                <div className="enviar">
                    <input 
                        type="submit" 
                        value="Agregar Producto" 
                        className="btn btn-azul" 
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default withRouter(NuevoProducto);