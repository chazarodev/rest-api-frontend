import React from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Cliente({cliente}) {

    //Extraer los valores
    const {_id, nombre, apellido, empresa, email, telefono} = cliente;

    //Eliminar Cliente
    const eliminarCliente = idCliente => {
        Swal.fire({
            title: `Deseas borrar a ${nombre} ${apellido}?`,
            text: "Esta acción no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00487C',
            cancelButtonColor: '#A01C48',
            confirmButtonText: 'Si, Borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                //Query a axios
                clienteAxios.delete(`/clientes/${idCliente}`).then(res => {
                    Swal.fire(
                        `${nombre} ${apellido} ha sido borrado.`,
                        res.data.mensaje,
                        'success'
                    );
                })
            }
        })
    }

    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>Teléfono: {telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>
                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarCliente(_id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}

export default Cliente;