import React from 'react';
import Square from './square';
import './Board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            squaresAlive: (new Array(400)).fill(false),
        };
    }


    renderSquare(i) {
        return <Square key={i} alive={this.state.squaresAlive[i]}></Square>
    }

    render() {
        return <div className='board'>
            {this.state.squaresAlive.map((value, i) => { return this.renderSquare(i) })}
        </div>
    }
}

export default Board;