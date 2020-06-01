export class ColumnWinInspector {
    constructor(column) {
        this.column = column;
    }

    inspector() {
        for (let i = 0; i < 3; i++) {
            let num1 = this.column[i];
            let num2 = this.column[i + 1];
            let num3 = this.column[i + 2];
            let num4 = this.column[i + 3];
            if (num1 !== undefined &&
                num1 === num2 &&
                num1 === num3 &&
                num1 === num4) {
                //console.log('inside if statement')
                return num1;
            }
        }
        return 0;
    }
}