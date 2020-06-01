export class Column {
    constructor() {
        this.tokens = [];
    }
    add(playerNumber) {
        if (this.isFull()) return;
        else this.tokens.push(playerNumber)
    }

    getTokenAt(rowIndex) {
        let flippedIndex = 5 - rowIndex;
        if (this.tokens.length === 0) {
            return null
        }
        if (this.tokens[flippedIndex] === 1) {
            return 1;
        }
        if (this.tokens[flippedIndex] === 2) {
            return 2;
        }
    }

    isFull() {
        if (this.tokens.length === 6) return true;
        else return false;
    }

}
