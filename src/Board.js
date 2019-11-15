import React from 'react';
import Square from './square';
import './Board.css';
import setDeathAlive from './setDeathAlive';
// todo: end of game : history + repeat itsealf on previous step
class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            squaresAll: (new Array(400)).fill(false),
            squaresAlive: new Map(),
            countInLine: 20,
            timerId: null,
            disabled: 'disabled'
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
            squaresAlive.set(i, i);
        }
        else if (!squares[i] && foundAliveSquare) {
            squaresAlive.delete(i);
        }
        const disabled = squaresAlive !== null && squaresAlive.size > 0 ? '' : 'disabled';
        this.setState({
            squaresAll: squares,
            squaresAlive: squaresAlive,
            disabled: disabled
        });
    }

    getSquaresAllFromDifference(aliveSquares) {
        var newSquaresAll = (new Array(400)).fill(false);
        for (const value of aliveSquares.keys()) {
            newSquaresAll[value] = true;
        }
        return newSquaresAll;
    }

    startGame() {
        const timerId = setInterval(() => this.nextStep(), 1000);
        this.setState({
            timerId: timerId,
        });
    }

    stopGame() {
        if (this.state.timerId !== null) {
            clearInterval(this.state.timerId);
            this.setState({
                timerId: null,
            });
        }
    }

    nextStep() {
        let newAliveSquares = setDeathAlive(this.state.squaresAlive, this.state.countInLine, this.state.squaresAll.length);
        let newAllSquares = this.getSquaresAllFromDifference(newAliveSquares);

        this.checkEndOfGame(newAliveSquares);

        this.setState({
            squaresAll: newAllSquares,
            squaresAlive: newAliveSquares,
        });
    }

    checkEndOfGame(squaresAlive) {
        if (squaresAlive === null || squaresAlive.size === 0) {
            clearInterval(this.state.timerId);
            this.setState({
                disabled: 'disabled',
                timerId: null,
            });
        }
    }

    getButtonStartStopText() {
        if (this.state.timerId === null) {
            return 'Start';
        }
        return 'Stop';
    }

    getActionButtonStartStop() {
        if (this.state.timerId === null) {
            return this.startGame();
        }
        return this.stopGame();
    }

    render() {
        const style = {
            gridTemplateColumns: 'repeat(' + this.state.countInLine + ', 1fr)',
        };
        return <div>
            <div className="header">
                <div>Click on initial squares and click 'Start'button</div>
                <div><button disabled={this.state.disabled} onClick={() => this.getActionButtonStartStop()}>{this.getButtonStartStopText()}</button>
                    <button disabled={this.state.disabled} onClick={() => this.nextStep()}>Next step</button></div>
            </div><div className='board' style={style}>{this.state.squaresAll.map((value, i) => { return this.renderSquare(i) })}
            </div>
        </div>
    }
}

export default Board;