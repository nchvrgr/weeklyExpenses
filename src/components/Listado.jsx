import React from 'react'
import Gasto from './Gasto'
import PropTypes from 'prop-types';

function Listado({gastos, setGastos, restante, setRestante}) {
    console.log("Gastos:", gastos)
    return (
        <div className='gastos-realizados'>
            <h2>History</h2>
            {
                gastos ? (
                    gastos.map( gasto => (
                        <Gasto gasto={gasto} key={gasto.id} setGastos={setGastos} gastos={gastos} restante={restante} setRestante={setRestante}/>
                    ))
                ):(
                    <p>No hubo ningún gasto hasta ahora</p>
                )

            }
        </div>
    )
}

Listado.propTypes = {
    gastos: PropTypes.array.isRequired
}

export default Listado
