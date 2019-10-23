export const setDeathAlive = (squaresAlive, countInLine, countOfAllSquares) => {
    let squares = new Map(squaresAlive);
    // todo : сказать, будут ли клетки живыми
    // todo : сказать, будут ли мертвые оживать
    for (let valueR of squares.keys()) {
        let neighbours = getNeighbours(valueR, countInLine, countOfAllSquares);
        console.log(neighbours);

    }
    return squares;
}
// todo : тесты, паттерн стратегия/фабрика в js (??)
function getNeighbours(value, countInLine, maxValue) {
    var neighbours = [];
    neighbours.push(value - 1);
    neighbours.push(value + 1);
    if (isInUpperBorder(value, countInLine)) {
        neighbours.push(value - countInLine + maxValue);
    }
    else {
        neighbours.push(value - countInLine);
    }
    if (isInUpperBorder(value, countInLine)) {
        neighbours.push(value - countInLine + maxValue - 1);
    }
    else if (isInLeftBorder(value, countInLine)) {
        neighbours.push(value + 2 * countInLine - 1);
    }
    else {
        neighbours.push(value - countInLine - 1);
    }

    if (isInUpperBorder(value, countInLine)) {
        neighbours.push(value - countInLine + maxValue + 1);
    }
    else {
        neighbours.push(value - countInLine + 1, maxValue);
    }

    if (isInLowerBorder(value, countInLine, maxValue)) {
        neighbours.push(value + countInLine - maxValue);
    }
    else {
        neighbours.push(value + countInLine);
    }

    if (isInLowerBorder(value, countInLine, maxValue)) {
        neighbours.push(value + countInLine - maxValue - 1);
    }
    else {
        neighbours.push(value + countInLine - 1);
    }

    if (isInLowerBorder(value, countInLine, maxValue)) {
        neighbours.push(value + countInLine - maxValue + 1);
    }
    else if (isInRightBorder(value, countInLine)) {
        neighbours.push(value - 2 * countInLine + 1);
    }
    else {
        neighbours.push(value + countInLine + 1);
    }
    return neighbours;
}

function isInUpperBorder(value, countInLine) {
    return value - countInLine < 0;
}

function isInLowerBorder(value, countInLine, maxValue) {
    return value + countInLine > maxValue
}

function isInLeftBorder(value, countInLine) {
    return value % countInLine == 0;
}

function isInRightBorder(value, countInLine) {
    return (value + 1) % countInLine == 0;
}