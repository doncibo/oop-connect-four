export class DiagonalWinInspector {
    constructor(columns) {
        this.columns = columns;
    }

    inspect() {
        for (let i = 0; i < 6; i++) {
            let token1 = this.columns[0].getTokenAt(i);
            let token2 = this.columns[1].getTokenAt(i + 1);
            let token3 = this.columns[2].getTokenAt(i + 2);
            let token4 = this.columns[3].getTokenAt(i + 3);
            if (token1 !== undefined &&
                token1 === token2 &&
                token1 === token3 &&
                token1 === token4) {
                return token1;
            }
            token1 = this.columns[0].getTokenAt(i + 3);
            token2 = this.columns[1].getTokenAt(i + 2);
            token3 = this.columns[2].getTokenAt(i + 1);
            token4 = this.columns[3].getTokenAt(i);

            if (token1 !== undefined &&
                token1 === token2 &&
                token1 === token3 &&
                token1 === token4) {
                return token1;
            }
        }

        return 0;
    }
}