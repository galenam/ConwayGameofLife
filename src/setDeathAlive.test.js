const setDeathAlive = require('./setDeathAlive');
const extentions = require('./testExtensions');

const countInLine = 20;
const countOfAllSquares = 400;

// todo : составить список тестов для ситуация клетка жива - умерла
test('3 triangle', () => {
    let initialAliveSquares = extentions.createCorrectDataStructure([0, 21, 40]);
    let alive1Generation = setDeathAlive(initialAliveSquares, countInLine, countOfAllSquares);
    let correctData = extentions.createCorrectDataStructure([20, 21]);
    expect(extentions.compareData(correctData, alive1Generation)).toEqual(true);
});
test('3 line', () => {
    let initialAliveSquares = extentions.createCorrectDataStructure([1, 21, 41]);
    let alive1Generation = setDeathAlive(initialAliveSquares, countInLine, countOfAllSquares);
    let correctData = extentions.createCorrectDataStructure([20, 21, 22]);
    expect(extentions.compareData(correctData, alive1Generation)).toEqual(true);
});

test('3 far from each other', () => {
    let initialAliveSquares = extentions.createCorrectDataStructure([0, 29, 40]);
    let alive1Generation = setDeathAlive(initialAliveSquares, countInLine, countOfAllSquares);
    let correctData = extentions.createCorrectDataStructure([]);
    expect(extentions.compareData(correctData, alive1Generation)).toEqual(true);
});

test('4 block', () => {
    let initialAliveSquares = extentions.createCorrectDataStructure([21, 22, 41, 42]);
    let alive1Generation = setDeathAlive(initialAliveSquares, countInLine, countOfAllSquares);
    let correctData = extentions.createCorrectDataStructure([21, 22, 41, 42]);
    expect(extentions.compareData(correctData, alive1Generation)).toEqual(true);
});

test('6 hive', () => {
    let initialAliveSquares = extentions.createCorrectDataStructure([22, 23, 41, 44, 62, 63]);
    let alive1Generation = setDeathAlive(initialAliveSquares, countInLine, countOfAllSquares);
    let correctData = extentions.createCorrectDataStructure([22, 23, 41, 44, 62, 63]);
    expect(extentions.compareData(correctData, alive1Generation)).toEqual(true);
});

test('7 loaf', () => {
    let initialAliveSquares = extentions.createCorrectDataStructure([23, 42, 44, 61, 64, 82, 83]);
    let alive1Generation = setDeathAlive(initialAliveSquares, countInLine, countOfAllSquares);
    let correctData = extentions.createCorrectDataStructure([23, 42, 44, 61, 64, 82, 83]);
    expect(extentions.compareData(correctData, alive1Generation)).toEqual(true);
});

test('5 R-pentamino', () => {
    let initialAliveSquares = extentions.createCorrectDataStructure([22, 23, 42, 41, 62]);
    let alive1Generation = setDeathAlive(initialAliveSquares, countInLine, countOfAllSquares);
    let correctData = extentions.createCorrectDataStructure([21, 22, 23, 41, 61, 62]);
    expect(extentions.compareData(correctData, alive1Generation)).toEqual(true);
});

test('7 acorn', () => {
    let initialAliveSquares = extentions.createCorrectDataStructure([23, 45, 62, 63, 66, 67, 68]);
    let alive1Generation = setDeathAlive(initialAliveSquares, countInLine, countOfAllSquares);
    let correctData = extentions.createCorrectDataStructure([42, 43, 44, 66, 67]);
    expect(extentions.compareData(correctData, alive1Generation)).toEqual(true);
});

test('5 glider', () => {
    let initialAliveSquares = extentions.createCorrectDataStructure([22, 43, 44, 63, 62]);
    let alive1Generation = setDeathAlive(initialAliveSquares, countInLine, countOfAllSquares);
    let correctData = extentions.createCorrectDataStructure([23, 44, 64, 62, 63]);
    expect(extentions.compareData(correctData, alive1Generation)).toEqual(true);
});
