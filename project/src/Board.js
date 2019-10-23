import React from 'react';
import Square from './square';
import './Board.css';
import { setDeathAlive } from './setDeathAlive';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            squaresAll: (new Array(400)).fill(false),
            squaresAlive: new Map(),
            countInLine: 20,
        };
    }


    renderSquare(i) {
        return <Square key={i} alive={this.state.squaresAll[i]} onClick={() => this.changeColor(i)}></Square>
    }

    changeColor(i) {
        let squares = this.state.squaresAll.slice();
        squares[i] = !squares[i];
        let squaresAlive = new Map(this.state.squaresAlive);
        let foundAliveSquare = squaresAlive.get(i);
        if (squares[i] && foundAliveSquare === undefined) {
            squaresAlive.set(i, true);
        }
        else if (!squares[i] && foundAliveSquare) {
            squaresAlive.delete(i);
        }
        this.setState({
            squaresAll: squares,
            squaresAlive: squaresAlive,
        });
    }

    // todo : реализовать функцию
    getSquaresAllFromDifference(difference, squaresAll) {
        return squaresAll.slice();
    }

    // todo : реализовать функцию
    getSquaresAlliveFromDifference(difference, squaresAlive) {
        return new Map(squaresAlive);
    }

    startGame() {
        let squaresAll = this.state.squaresAll.slice();
        let squaresAlive = new Map(this.state.squaresAlive);
        let difference = setDeathAlive(squaresAlive, this.state.countInLine, squaresAll.length);
        let squaresAllNew = this.getSquaresAllFromDifference(difference, squaresAll);
        let squaresAliveNew = this.getSquaresAlliveFromDifference(difference, squaresAlive);
        this.setState({
            squaresAll: squaresAllNew,
            squaresAlive: squaresAliveNew,
        });
    }

    render() {
        const style = {
            gridTemplateColumns: 'repeat(' + this.state.countInLine + ', 1fr)',
        };
        return <div>
            <div className="header">
                <div>Click on initial squares and click 'Start'button</div>
                <div><button onClick={() => this.startGame()}>Start</button></div>
            </div><div className='board' style={style}>{this.state.squaresAll.map((value, i) => { return this.renderSquare(i) })}
            </div>
        </div>
    }
}

export default Board;