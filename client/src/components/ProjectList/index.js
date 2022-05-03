import React from 'react';
import { Link } from 'react-router-dom';

export default ProjectList = ({
    _id = 0, openModal
}) => {

    return (
        <div>
            <button onClick={openModal}></button>        
        </div>
    )
}