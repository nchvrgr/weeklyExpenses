import React from 'react'
import PropTypes from 'prop-types';

function Gasto({gasto, setGastos, gastos, setRestante, restante}) {
    function eliminarGasto(){
        setGastos( gastos.filter(g => g.id !== gasto.id));
        setRestante( restante + gasto.cantidad);
    }
    return (
        <>
        <li className="gastos">
            <p className="detalleGasto">
                {gasto.nombre}
                <span>
                    <span className="gasto">
                        <span className="dolar">$</span> {gasto.cantidad}
                    </span>
                    <button className="boton" onClick={() => eliminarGasto() }> x </button>
                </span>
            </p>
            <p className="hora">{gasto.fecha}</p>

        </li>

        </>
    )
}


Gasto.propTypes = {
    gasto: PropTypes.object.isRequired
}

export default Gasto;
