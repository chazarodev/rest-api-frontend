import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Producto({producto}) {

    //Destructuring al producto
    const {_id, nombre, precio, imagen} = producto;

    //Eliminar un producto
    const eliminarProducto = id => {
        Swal.fire({
            title: `Seguro de Eliminar ${nombre}?`,
            text: "Un producto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00487C',
            cancelButtonColor: '#A01C48',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                //Eliminar en la rest api
                clienteAxios.delete(`/productos/${id}`).then(res => {
                    if (res.status === 200) {
                        Swal.fire(
                            'Eliminado!',
                            `${nombre} ${res.data.mensaje}`,
                            'success'
                        )
                    }
                })
            }
        })
    }

    return (  
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">{precio}</p>
                {imagen ? (
                    <img src={`http://localhost:5000/${imagen}`} alt="Imagen del Producto" />
                ) : null}
            </div>
            <div className="acciones">
                <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>
                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarProducto(_id)}    
                >
                    <i className="fas fa-times"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    );
}

export default Producto;