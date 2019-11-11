import React from 'react';

const Store = props => (
    <div>
        <h5>{props.store.name}</h5>
        <h6>{props.store.rating}</h6>
    </div>
)

export default Store;