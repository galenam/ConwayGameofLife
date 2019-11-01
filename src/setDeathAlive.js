function setDeathAlive(squaresAlive, countInLine, countOfAllSquares) {
    let squares = new Map(squaresAlive);
    // todo : сказать, будут ли клетки живыми
    // todo : сказать, будут ли мертвые оживать
    for (let value of squares.keys()) {
        let neighbours = getNeighbours(value, countInLine, countOfAllSquares);
        console.log(neighbours);

    }
    return squares;
}

function getNeighbours(value, countInLine, maxValue) {
    var neighbours = [];
    //0
    neighbours.push(setIntoRange(value - 1, maxValue));
    //1
    neighbours.push(setIntoRange(value + 1, maxValue));
    //2
    if (isInUpperBorder(value, countInLine)) {
        neighbours.push(value - countInLine + maxValue);
    }
    else {
        neighbours.push(value - countInLine);
    }
    //3
    if (isInUpperBorder(value, countInLine) && !isInLeftBorder(value, countInLine)) {
        neighbours.push(value - countInLine + maxValue - 1);
    }
    else {
        if (isInLeftBorder(value, countInLine)) {
            neighbours.push(setIntoRange(value + 2 * countInLine - 1, maxValue));
        }
        else {
            neighbours.push(value - countInLine - 1);
        }
    }
    //4
    if (isInUpperBorder(value, countInLine)) {
        neighbours.push(setIntoRange(value - countInLine + maxValue + 1, maxValue));
    }
    else {
        neighbours.push(value - countInLine + 1);
    }
    //5
    if (isInLowerBorder(value, countInLine, maxValue)) {
        neighbours.push(value + countInLine - maxValue);
    }
    else {
        neighbours.push(value + countInLine);
    }
    //6
    if (isInLowerBorder(value, countInLine, maxValue)) {
        neighbours.push(setIntoRange(value + countInLine - maxValue - 1, maxValue));
    }
    else {
        neighbours.push(value + countInLine - 1);
    }
    //7
    if (isInLowerBorder(value, countInLine, maxValue) && !isInRightBorder(value, countInLine)) {
        neighbours.push(value + countInLine - maxValue + 1);
    }
    else if (isInRightBorder(value, countInLine)) {
        neighbours.push(setIntoRange(value - 2 * countInLine + 1, maxValue));
    }
    else {
        neighbours.push(value + countInLine + 1);
    }
    return neighbours;
}

function isInUpperBorder(value, countInLine) {
    return (value - countInLine < 0);
}

function isInLowerBorder(value, countInLine, maxValue) {
    return value + countInLine >= maxValue
}

function isInLeftBorder(value, countInLine) {
    return value % countInLine == 0;
}

function isInRightBorder(value, countInLine) {
    return (value + 1) % countInLine == 0;
}

function setIntoRange(value, maxValue) {
    if (value >= maxValue) {
        return value - maxValue;
    }
    if (value < 0) {
        return value + maxValue;
    }
    return value;
}

module.exports.getNeighbours = getNeighbours;
module.exports.setDeathAlive = setDeathAlive;