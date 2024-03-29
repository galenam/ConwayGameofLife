import React from 'react';
import Square from './square';
import './Board.css';
import setDeathAlive from './setDeathAlive';

class Board extends React.Component {

    greetingMessage = 'Click on initial squares and click \'Start\'button';
    endOfGameEmptyMessage = 'Game over. All cells are dead. You can select new configuration and play once more. Enjoy!';
    endOfGameRepeatConfigarationMessage = 'Game over. Game repeat configuraion from one of previous steps. You can click \'Start\' button or add more cells and  click \'Start\' button';

    enumCheckEndOfGame = { gameContinue: 0, gameOverAllDead: 1, gameOverRepeatPrevious: 3 };

    constructor(props) {
        super(props);

        this.state = {
            squaresAll: (new Array(400)).fill(false),
            squaresAlive: new Map(),
            countInLine: 20,
            timerId: null,
            disabled: 'disabled',
            history: new Array(),
            isDefaultStateAdded: false,
            messageDescription: this.greetingMessage,
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
        let history = this.state.history.slice();
        let isDefaultStateAdded = this.state.isDefaultStateAdded;
        if (!isDefaultStateAdded) {
            history.push(this.state.squaresAlive);
            isDefaultStateAdded = true;
        }
        let newAliveSquares = setDeathAlive(this.state.squaresAlive, this.state.countInLine, this.state.squaresAll.length);

        const isGameOver = this.checkEndOfGame(newAliveSquares, history);
        let disabled = this.state.disabled;
        let messageDescription = this.state.messageDescription;

        if (isGameOver === this.enumCheckEndOfGame.gameContinue) {
            history.push(newAliveSquares);
        }
        else {
            history = new Array();
            disabled = newAliveSquares === null || newAliveSquares.size === 0 ? 'disabled' : '';
            isDefaultStateAdded = false;
            if (isGameOver === this.enumCheckEndOfGame.gameOverAllDead) {
                messageDescription = this.endOfGameEmptyMessage;
            }
            else if (isGameOver === this.enumCheckEndOfGame.gameOverRepeatPrevious) {
                messageDescription = this.endOfGameRepeatConfigarationMessage;
                newAliveSquares = new Map(this.state.squaresAlive);
            }
        }

        let newAllSquares = this.getSquaresAllFromDifference(newAliveSquares);

        this.setState({
            squaresAll: newAllSquares,
            squaresAlive: newAliveSquares,
            history: history,
            disabled: disabled,
            isDefaultStateAdded: isDefaultStateAdded,
            messageDescription: messageDescription,
        });
        if (isGameOver) {
            this.endGame();
        }
    }

    checkEndOfGame(squaresAlive, history) {
        if (squaresAlive === null || squaresAlive.size === 0) {
            return this.enumCheckEndOfGame.gameOverAllDead;
        }
        for (let i = 0; i < history.length; i++) {
            if (this.compareWithPreviousConfiguration(history[i], squaresAlive) === true) {
                return this.enumCheckEndOfGame.gameOverRepeatPrevious;
            }
        }
        return this.enumCheckEndOfGame.gameContinue;
    }

    compareWithPreviousConfiguration(sourceMap, destinationMap) {
        if (sourceMap.size !== destinationMap.size) {
            return false;
        }
        // get 0-element from source
        let source0Element;
        for (let value of sourceMap.keys()) {
            source0Element = value;
            break;
        }
        // get 0-element from destination
        let destination0Element;
        for (let value of destinationMap.keys()) {
            destination0Element = value;
            break;
        }
        let difference = destination0Element - source0Element;
        for (let value of sourceMap.keys()) {
            if (!destinationMap.has(value) && !destinationMap.has(value + difference)) {
                return false;
            }
        }
        return true;
    }

    createArrayFromKeysMap(map) {
        let array = new Array();
        for (const value of map.keys()) {
            array.push(value);
        }
        return array;
    }

    endGame() {
        clearInterval(this.state.timerId);
        this.setState({
            //        disabled: 'disabled',
            timerId: null,
            //        history: new Array(),
        });
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
                <div>{this.state.messageDescription}</div>
                <div><button disabled={this.state.disabled} onClick={() => this.getActionButtonStartStop()}>{this.getButtonStartStopText()}</button>
                    <button disabled={this.state.disabled} onClick={() => this.nextStep()}>Next step</button></div>
            </div><div className='board' style={style}>{this.state.squaresAll.map((value, i) => { return this.renderSquare(i) })}
            </div>
        </div>
    }
}

export default Board;