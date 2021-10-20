import React, { Fragment } from 'react';
import { revisarPresupuesto } from '../helpers';
import PropTypes from 'prop-types';

function Control({presupuesto, restante}) {
    return (
        <Fragment>
            <div className="alert alert-primary">
                Budget: $ {presupuesto}
            </div>
            <div className={revisarPresupuesto(presupuesto, restante)}>
                Remaining: $ {restante}
            </div>
        </Fragment>
    )
}

Control.propTypes = {
    presupuesto: PropTypes.number.isRequired,
    restante: PropTypes.number.isRequired
}

export default Control
