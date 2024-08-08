class TypeChecker {

    static isInteger (value) {
        return /^\d+$/.test(value);
    }
}

module.exports = { TypeChecker };