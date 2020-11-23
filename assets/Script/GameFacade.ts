const { ccclass, property } = cc._decorator;

@ccclass
export default class GameFacade extends cc.Component {

    // 0 - не пройдено
    // 1 - хрестик
    // 2 - нулик
    currentPlayer = 1;
    gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    GoStep(position: number): number {
        this.gameField[--position] = this.currentPlayer;
        var current = this.currentPlayer;
        this.ReversePlayer();
        this.Display();
        return current;
    }

    private ReversePlayer() {
        this.currentPlayer == 1 ? this.currentPlayer = 2 : this.currentPlayer = 1;
    }

    CheckWin(): number {
        var isXWins = this.CheckWinForPlayer(1);
        var isOWins = this.CheckWinForPlayer(2);

        if (isXWins)
            return 1;
        else if (isOWins)
            return 2;
        else
            return 0;

    }

    CheckWinForPlayer(type: number): boolean {
        var isRowSuccess = false;
        for (let i = 0; i < 9; i += 3) {
            for (let j = i; j < i + 3; j++) {
                this.gameField[j] == type ? isRowSuccess = true : isRowSuccess = false;
            }
            if (isRowSuccess)
                break;
        }

        var isColumnSuccess = false;
        for (let i = 0; i < 3; i++) {
            for (let j = i; j < 9; j += 3) {
                this.gameField[j] == type ? isColumnSuccess = true : isColumnSuccess = false;
            }
            if (isColumnSuccess)
                break;
        }

        var isLeftDiagonalSuccess = false;
        for (let j = 0; j < 9; j += 4) {
            this.gameField[j] == type ? isLeftDiagonalSuccess = true : isLeftDiagonalSuccess = false;
        }

        var isRightDiagonalSuccess = false;
        for (let j = 0; j < 9; j += 2) {
            this.gameField[j] == type ? isRightDiagonalSuccess = true : isRightDiagonalSuccess = false;
        }

        var success = isRowSuccess || isColumnSuccess || isRightDiagonalSuccess || isLeftDiagonalSuccess;



        console.log(`row: ${isRowSuccess}\ncolumn: ${isColumnSuccess}\nrDig: ${isRightDiagonalSuccess}\nleftDig: ${isLeftDiagonalSuccess}`);
        return success;
    }

    Display() {
        console.log("Game field -> " + this.gameField);
    }

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
