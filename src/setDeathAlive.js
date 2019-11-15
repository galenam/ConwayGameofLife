const getNeighbours = require('./getNeighbours');

function setDeathAlive(squaresAlive, countInLine, countOfAllSquares) {

    let squares = new Map(squaresAlive);
    let resultMap = new Map();
    for (const value of squares.keys()) {
        let squaresInner = new Map(squares);
        squaresInner.delete(value);
        let neighboursOfAliveSquares = getNeighbours(value, countInLine, countOfAllSquares);
        let countAliveNearAliveSquare = 0;
        for (const valueAlive of squaresInner.keys()) {
            if (neighboursOfAliveSquares.has(valueAlive)) {
                countAliveNearAliveSquare++;
                for (const neighbourDead of neighboursOfAliveSquares.keys()) {
                    if (!squaresAlive.has(neighbourDead)) {
                        let neighboursOfDeadSqure = getNeighbours(neighbourDead, countInLine, countOfAllSquares);
                        let countAliveNearDeadSquare = 0;
                        for (const neighbourNearDeadSquare of neighboursOfDeadSqure.keys()) {
                            if (squaresAlive.has(neighbourNearDeadSquare)) {
                                countAliveNearDeadSquare++;
                            }
                            if (countAliveNearDeadSquare > 3) continue;
                        }
                        if (!resultMap.has(neighbourDead) && countAliveNearDeadSquare === 3) {
                            resultMap.set(neighbourDead);
                        }
                    }
                }
            }
            if (countAliveNearAliveSquare > 3) continue;
        }
        if (countAliveNearAliveSquare === 2 || countAliveNearAliveSquare === 3) {
            resultMap.set(value, value);
        }
    }
    return resultMap;
}

module.exports = setDeathAlive;