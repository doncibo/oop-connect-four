import { Column } from './column.mjs';
import { ColumnWinInspector } from './column-win-inspector.mjs';
import { RowWinInspector } from './row-win-inspector.mjs';
import { DiagonalWinInspector } from './diagonal-win-inspector.mjs';

export class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = 1;
        this.columns = [new Column(1), new Column(2), new Column(3), new Column(4), new Column(5), new Column(6), new Column(7)]
        this.winnerNumber = 0;
    }

    getName() {
        if (this.winnerNumber === 3) {
            return `${this.player1} tied with ${this.player2}!`
        };

        if (this.winnerNumber === 1) {
            return `${this.player1} wins!`;
        };

        if (this.winnerNumber === 2) {
            return `${this.player2} wins!`
        }

        else {
            return `${this.player1} vs ${this.player2}`
        };
    }

    playInColumn(columnNum) {
        this.columns[columnNum].add(this.currentPlayer);

        //toggle 
        if (this.currentPlayer === 1) {
            this.currentPlayer = 2;
        } else {
            this.currentPlayer = 1;
        }
        this.checkForTie();
        this.checkForColumnWin();
        this.checkForRowWin();
        this.checkDiagonalWin();
    }

    getTokenAt(rowIndex, columnIndex) {
        return this.columns[columnIndex].getTokenAt(rowIndex);
    }

    isColumnFull(colIndex) {
        if (this.winnerNumber === 1 || this.winnerNumber === 2) {
            return true;
        }
        return this.columns[colIndex].isFull();
    }

    checkForTie() {
        let counter = 0
        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i].isFull()) {
                counter++;
            }
        }
        if (counter === 7) {
            this.winnerNumber = 3;
        }
    }

    checkForColumnWin() {
        if (this.winnerNumber !== 0) {
            return;
        }

        for (let i = 0; i < this.columns.length; i++) {
            let winChecker = new ColumnWinInspector(this.columns[i].tokens);
            if (winChecker.inspector() === 1) {
                this.winnerNumber = 1;
                break;
            }
            else if (winChecker.inspector() === 2) {
                this.winnerNumber = 2;
                break;
            }
        };
    }

    checkForRowWin() {
        if (this.winnerNumber !== 0) {
            return;
        }

        let group1 = new RowWinInspector(this.columns.slice(0, 4));
        let group2 = new RowWinInspector(this.columns.slice(1, 5));
        let group3 = new RowWinInspector(this.columns.slice(2, 6));
        let group4 = new RowWinInspector(this.columns.slice(3, 7));

        if (group1.inspect() === 1 ||
            group2.inspect() === 1 ||
            group3.inspect() === 1 ||
            group4.inspect() === 1) {
            this.winnerNumber = 1;
        }
        else if (group1.inspect() === 2 ||
            group2.inspect() === 2 ||
            group3.inspect() === 2 ||
            group4.inspect() === 2) {
            this.winnerNumber = 2;
        }
    }

    checkDiagonalWin() {
        if (this.winnerNumber !== 0) {
            return;
        }

        let group1 = new DiagonalWinInspector(this.columns.slice(0, 4));
        let group2 = new DiagonalWinInspector(this.columns.slice(1, 5));
        let group3 = new DiagonalWinInspector(this.columns.slice(2, 6));
        let group4 = new DiagonalWinInspector(this.columns.slice(3, 7));

        if (group1.inspect() === 1 ||
            group2.inspect() === 1 ||
            group3.inspect() === 1 ||
            group4.inspect() === 1) {
            this.winnerNumber = 1;
        }
        else if (group1.inspect() === 2 ||
            group2.inspect() === 2 ||
            group3.inspect() === 2 ||
            group4.inspect() === 2) {
            this.winnerNumber = 2;
        }
    }
}
