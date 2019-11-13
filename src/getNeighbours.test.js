const getNeighbours = require('./getNeighbours');
const extentions = require('./testExtensions');

test('data from normal cell', () => {
    let data = getNeighbours(25, 20, 400);
    let correctData = extentions.createCorrectDataStructure([24, 26, 4, 5, 6, 44, 45, 46]);
    expect(extentions.compareData(correctData, data)).toEqual(true);
});

test('data from left border', () => {
    let data = getNeighbours(20, 20, 400);
    let correctData = extentions.createCorrectDataStructure([0, 1, 21, 40, 41, 39, 19, 59]);
    expect(extentions.compareData(correctData, data)).toEqual(true);
});

test('data from top border', () => {
    let data = getNeighbours(2, 20, 400);
    let correctData = extentions.createCorrectDataStructure([1, 3, 21, 22, 23, 381, 382, 383]);
    expect(extentions.compareData(correctData, data)).toEqual(true);
});

test('data from right border', () => {
    let data = getNeighbours(39, 20, 400);
    let correctData = extentions.createCorrectDataStructure([18, 19, 38, 58, 59, 0, 20, 40]);
    expect(extentions.compareData(correctData, data)).toEqual(true);
});

test('data from bottom border', () => {
    let data = getNeighbours(382, 20, 400);
    let correctData = extentions.createCorrectDataStructure([381, 383, 361, 362, 363, 1, 2, 3]);
    expect(extentions.compareData(correctData, data)).toEqual(true);
});

test('data from left top corner', () => {
    let data = getNeighbours(0, 20, 400);
    let correctData = extentions.createCorrectDataStructure([1, 20, 21, 19, 39, 380, 381, 399]);
    expect(extentions.compareData(correctData, data)).toEqual(true);
});

test('data from left bottom corner', () => {
    let data = getNeighbours(380, 20, 400);
    let correctData = extentions.createCorrectDataStructure([360, 381, 361, 399, 379, 0, 1, 19]);
    expect(extentions.compareData(correctData, data)).toEqual(true);
});

test('data from right top corner', () => {
    let data = getNeighbours(19, 20, 400);
    let correctData = extentions.createCorrectDataStructure([18, 38, 39, 0, 20, 398, 399, 380]);
    expect(extentions.compareData(correctData, data)).toEqual(true);
});

test('data from right bottom corner', () => {
    let data = getNeighbours(399, 20, 400);
    let correctData = extentions.createCorrectDataStructure([378, 379, 398, 18, 19, 360, 380, 0]);
    expect(extentions.compareData(correctData, data)).toEqual(true);
});