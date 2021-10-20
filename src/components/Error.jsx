import React from 'react';
import PropTypes from 'prop-types';

function Error({msg}) {
    return (
        <p className="alert alert-danger error">{msg}</p>
    )
}

Error.propTypes = {
    msg: PropTypes.string.isRequired
}

export default Error
