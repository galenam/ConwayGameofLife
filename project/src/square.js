import React from 'react';
import './Board.css';

function Square(props) {
    return (
        <div className={props.alive === true ? 'nonEmpty' : ''} onClick={() => props.onClick()}></div>
    );
};

export default Square;