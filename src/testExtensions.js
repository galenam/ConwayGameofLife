function createCorrectDataStructure(arr) {
    let structure = new Map();
    arr.forEach(element => {
        structure.set(element, element);
    });
    return structure;
}

function compareData(initialData, resultData) {
    if (initialData.size !== resultData.size) {
        return false;
    }
    for (let value of initialData.keys()) {
        if (!resultData.has(value)) {
            return false;
        }
    }
    return true;
}

module.exports.createCorrectDataStructure = createCorrectDataStructure;
module.exports.compareData = compareData;