import React, {useState, useContext} from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router';
import clienteAxios from '../../config/axios';
import {CRMContext} from '../../context/CRMContext';

function Login({history}) {

    //Auth y Token
    const [auth, guardarAuth] = useContext(CRMContext);

    //State con los datos del formulario
    const [credenciales, guardarCredenciales] = useState({
        email: '',
        password: ''
    });

    //Iniciar sesión en el servidor
    const iniciarSesion = async e => {
        e.preventDefault();

        //Autenticar al usuario
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            //Extraer el token y colocarlo en localStorage
            const {token} = respuesta.data;
            localStorage.setItem('token', token);

            //Colocarlo en el state
            guardarAuth({token, auth:true});

            //alerta
            Swal.fire(
                'Login Correcto!',
                'Has Iniciado Sesión',
                'success'
            )
            //Redireccionar
            history.push('/');

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un Error',
                text: error.response.data.mensaje
            })
        }
    }

    //Almacenar lo que es usuario escribe en el state
    const leerDatos = e => {
        const {target: {name}} = e;
        const {target: {value}} = e;
        guardarCredenciales({
            ...credenciales,
            [name]: value
        })
    }

    return (  
        <div className="login">
            <h2>Iniciar Sesión</h2>
            <div className="contenedor-formulario">
                <form
                    onSubmit={iniciarSesion}
                >
                    <div className="campo">
                        <label htmlFor="Email">Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Escribe tu email" 
                            required
                            onChange={leerDatos}    
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Escribe tu password" 
                            required
                            onChange={leerDatos}    
                        />
                    </div>
                    <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block" />
                </form>
            </div>
        </div>
    );
}

export default withRouter(Login);