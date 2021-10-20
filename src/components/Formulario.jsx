import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';

function Formulario({setGasto, setCrearGasto, presupuestoInicial}) {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [error, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState('');

    const getFecha = () => {
        
        var date = new Date();
        var hora = date.getHours().toString();
        if(hora.length < 2){
            hora = '0' + hora;
        }
        var minutos = date.getMinutes().toString();
        if(minutos.length < 2){
            minutos = '0' + minutos;
        }
        var dia = date.getDay().toString();
        if(dia.length < 2){
            dia = '0' + dia;
        }
        var mes = date.getMonth().toString();
        if(mes.length < 2){
            mes = '0' + mes
        }
        var fechaCompleta = `${dia}/${mes} - ${hora}:${minutos}`;
        return fechaCompleta;
    }

    const nuevoGasto = e => {
        e.preventDefault();
        if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            setError(true);
            if (isNaN(cantidad) && nombre.trim() === '') setErrorDetail('Fill the textfields');
            if (cantidad < 1) setErrorDetail('The amount must be greater than zero');
            if (nombre.trim() === '') setErrorDetail('You must enter a title');
            if (isNaN(cantidad)) setErrorDetail('You must enter an amount');
            return;
        }
        setError(false);
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate(),
            fecha: getFecha()
        }
        setGasto(gasto);
        setCrearGasto(true);
        setNombre('');
        setCantidad('');
    }

    return (
        <form onSubmit={nuevoGasto}>
            <h2>Add new expense</h2>
            { error ? <Error msg={errorDetail}/> : null }
            <div className="campo">
                <label className="label"> Title  </label>
                <input className="input camps u-full-width" type="text" placeholder="Example: food"
                 value={nombre} onChange={ e => setNombre(e.target.value)}/>
            </div>

            <div className="campo">
                <label className="label"> Amount  </label>
                <input className="input camps u-full-width" type="number" placeholder="Example: 300"
                value={cantidad} onChange={ e => setCantidad(parseInt(e.target.value))}/>
            </div>

            <input type="submit" className="boton button-primary add u-full-width" value="Add"/>

        </form>
    )
}

Formulario.propTypes = {
    setGasto: PropTypes.func.isRequired,
    setCrearGasto: PropTypes.func.isRequired
}

export default Formulario;
