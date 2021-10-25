import React, {useState, useEffect, Fragment} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router';
import Spinner from '../layout/Spinner';

function EditarProducto(props) {

    //Obtener el Id
    const {id} = props.match.params;

    //producto=state, y función para actualizar
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    });

    //Archivo=state, guardarArchivo= setState
    const [archivo, guardarArchivo] = useState('');
    
    //Consultar la API para traer el producto a editar
    const consultarAPI = async() => {
        const productoConsulta = await clienteAxios.get(`/productos/${id}`);
        guardarProducto(productoConsulta.data);
    }

    //Cuando el componente carga
    useEffect(() => {
        consultarAPI();
        // eslint-disable-next-line
    }, [])

    //Edita un producto en la base de datos
    const editarProducto = async e => {
        e.preventDefault();

        //Crear un form-data
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        //Almacenar en la base de datos
        try {
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: {
                    'Content-Type': 'Multipart/form-data'
                }
            });
            //Lanzar alert
            if (res.status === 200) {
                Swal.fire(
                    'Producto Editado',
                    'Cambios guardados',
                    'success'
                );
            }
            //Redireccionar
            props.history.push('/productos');
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

    //Extraer los valores del state
    const {nombre, precio, imagen} = producto;

    if (!nombre && !precio) {
        return <Spinner />
    }

    return (
        <Fragment>
            <h2>Editar producto</h2>
            <form
                onSubmit={editarProducto}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre del Producto" 
                        defaultValue={nombre}
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
                        defaultValue={precio}
                        onChange={leerInformacionProducto}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="imagen">Imagen:</label>
                    {imagen ? (
                        <img src={`http://localhost:5000/${imagen}`} alt="Imagen Producto" width="200" />
                    ): null}
                    <input 
                        type="file" 
                        name="imagen"
                        onChange={leerArchivo} 
                    />
                </div>
                <div className="enviar">
                    <input 
                        type="submit" 
                        value="Guardar Cambios" 
                        className="btn btn-azul" 
                    />
                </div>
            </form>
        </Fragment>  
    );
}

export default EditarProducto;
