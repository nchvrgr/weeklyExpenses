import React, { Fragment, useState } from 'react'
import Error from './Error';
import PropTypes from 'prop-types';

function Pregunta({setPresupuesto, setRestante, setVerPregunta, presupuestoInicial}) {

    const [cantidad, setCantidad] = useState(0);
    const [error, setError] = useState(false);

    const definirPresupuesto = e => {
        setCantidad(parseInt(e.target.value));
    }

    const agregarPresupuesto = e => {
        e.preventDefault();
        if (cantidad < 1 || isNaN(cantidad)) {
            setError(true);
            return;
        }
        setError(false);
        setPresupuesto(cantidad);
        localStorage.setItem('presupuesto', cantidad);
        setRestante(cantidad);
        setVerPregunta(false);
    }

    return (
        <Fragment>
            <h2>Enter your budget</h2>
            { error ? <Error msg="Enter an amomunt bigger than zero"/> : null}
            <form onSubmit={agregarPresupuesto}>
                <input type="number" className="u-full-width"
                placeholder="Type here" onChange={definirPresupuesto}/>
                
                <input type="submit" className="boton button-primary enter u-full-width"
                value="Enter"/>
            </form>
        </Fragment>
    )
}

Pregunta.propTypes = {
    setPresupuesto: PropTypes.func.isRequired,
    setRestante: PropTypes.func.isRequired,
    setVerPregunta: PropTypes.func.isRequired
}

export default Pregunta
