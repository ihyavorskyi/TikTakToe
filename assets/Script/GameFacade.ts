import { position } from './../../creator.d';
import Finish from "./Finish";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameFacade extends cc.Component {

    // 0 - не пройдено
    // 1 - хрестик
    // 10 - нулик
    currentPlayer = 1;
    gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    lastField = 0;

    GoStep(position: number): number {
        return this.GoStep_Before(position);
    }


    GoStepWithAI_Low(position: number) {
        this.GoStep_Before(position);
        this.GoStepAIEasy();
        this.GoStepAI_After();
        return this.lastField;
    }


    GoStepWithAI_Middle(position: number) {
        this.GoStep_Before(position);

        if (this.CheckWin() != 0)
            return null;

        this.GoStepAIMiddle();
        this.GoStepAI_After();

        return this.lastField;
    }

    GoStepWithAI_Hard(position: number) {
        if (this.CheckWin() != 0)
            return null;
        this.GoStep_Before(position);
        var result = this.GoStepAIHard();

        if (result)
            return this.lastField;
        else
            this.GoStepAIMiddle();

        this.GoStepAI_After();

        return this.lastField;
    }

    GoStep_Before(position: number) {
        this.gameField[--position] = this.currentPlayer;
        var current = this.currentPlayer;
        this.ReversePlayer();
        this.Display();
        this.lastField = position;
        return current;
    }

    GoStepAI_After() {
        this.Display();
        this.ReversePlayer();
    }

    private GoStepAIHard() {
        for (let i = 0; i < 9; i += 3) {
            if (this.gameField[i] + this.gameField[i + 1] + this.gameField[i + 2] == 20) {
                for (let j = i; j < 9; j++) {
                    if (this.gameField[j] == 0) {
                        this.gameField[j] = 10;
                        this.lastField = j;
                        return true;
                    }
                }
            }
            else
                continue;
        }

        for (let i = 0; i < 3; i++) {
            if (this.gameField[i] + this.gameField[i + 3] + this.gameField[i + 6] == 20) {
                for (let j = i; j < 9; j += 3) {
                    if (this.gameField[j] == 0) {
                        this.gameField[j] = 10;
                        this.lastField = j;
                        return true;
                    }
                }
                break;
            }
            else
                continue;
        }

        if (this.gameField[0] + this.gameField[4] + this.gameField[8] == 20) {
            for (let i = 0; i < 9; i += 4) {
                if (this.gameField[i] == 0) {
                    this.gameField[i] = 10;
                    this.lastField = i;
                    return true;
                }
            }
        }
        else if (this.gameField[2] + this.gameField[4] + this.gameField[6] == 20) {
            for (let i = 2; i < 7; i += 2) {
                if (this.gameField[i] == 0) {
                    this.gameField[i] = 10;
                    this.lastField = i;
                    return true;
                }
            }
        }
        return false;

    }

    private GoStepAIMiddle() {
        for (let i = 0; i < 9; i += 3) {
            if (this.gameField[i] + this.gameField[i + 1] + this.gameField[i + 2] == 2) {
                for (let j = i; j < 9; j++) {
                    if (this.gameField[j] == 0) {
                        console.log('cycle 1 ' + `r:${i} c:${j}`);

                        this.gameField[j] = this.currentPlayer;
                        this.lastField = j;
                        return;
                    }
                }
            }
        }
        for (let i = 0; i < 3; i++) {
            if (this.gameField[i] + this.gameField[i + 3] + this.gameField[i + 6] == 2) {
                for (let j = i; j < 9; j += 3) {
                    if (this.gameField[j] == 0) {
                        console.log('cycle 2 ' + `c:${i} c:${j}`);
                        this.gameField[j] = this.currentPlayer;
                        this.lastField = j;
                        return;
                    }
                }
                break;
            }
        }

        if (this.gameField[0] + this.gameField[4] + this.gameField[8] == 2) {
            for (let i = 0; i < 9; i += 4) {
                if (this.gameField[i] == 0) {
                    console.log('cycle 3 ' + `${i}`);
                    this.gameField[i] = this.currentPlayer;
                    this.lastField = i;
                    return;
                }
            }
        }
        else if (this.gameField[2] + this.gameField[4] + this.gameField[6] == 2) {
            for (let i = 2; i < 7; i += 2) {
                if (this.gameField[i] == 0) {
                    console.log('cycle 4 ' + i);
                    this.gameField[i] = this.currentPlayer;
                    this.lastField = i;
                    return;
                }
            }
        } else {
            this.StepOnRandomPosition();
        }
    }


    private GoStepAIEasy() {

        if (this.gameField[0] == 0) {
            this.gameField[0] = this.currentPlayer;
            this.lastField = 0;
        }
        else if (this.gameField[2] == 0) {
            this.gameField[2] = this.currentPlayer;
            this.lastField = 2;
        }
        else if (this.gameField[6] == 0) {
            this.gameField[6] = this.currentPlayer;
            this.lastField = 6;
        }
        else if (this.gameField[8] == 0) {
            this.gameField[8] = this.currentPlayer;
            this.lastField = 8;
        } else
            this.StepOnRandomPosition();
    }

    private StepOnRandomPosition() {
        for (let i = 0; i < 9; i++) {
            if (this.gameField[i] == 0) {
                this.gameField[i] = this.currentPlayer;
                this.lastField = i;
                break;
            }
            else
                continue;
        }
    }

    private ReversePlayer() {
        this.currentPlayer == 1 ? this.currentPlayer = 10 : this.currentPlayer = 1;
    }

    CheckWin(): number {
        var isNoOne = this.gameField.every(r => r != 0);
        if (isNoOne) {
            setTimeout(() => {
                Finish.winId = -1;
                cc.director.loadScene("Finish");
                return -1;
            }, 1000)
        }
        var isXWins = this.CheckWinForPlayer(1);
        var isOWins = this.CheckWinForPlayer(10);

        if (isXWins)
            return 1;
        else if (isOWins)
            return 10;
        else
            return 0;

    }

    private CheckWinForPlayer(type: number): boolean {
        this.Display();
        var isRowSuccess = false;
        for (let i = 0; i < 9; i += 3) {
            for (let j = i; j < i + 3; j++) {
                if (this.gameField[j] == type)
                    isRowSuccess = true;
                else {
                    isRowSuccess = false;
                    break;
                }
            }
            if (isRowSuccess)
                break;
        }

        var isColumnSuccess = false;
        for (let i = 0; i < 3; i++) {
            for (let j = i; j < 9; j += 3) {
                if (this.gameField[j] == type)
                    isColumnSuccess = true;
                else {
                    isColumnSuccess = false;
                    break;
                }
            }
            if (isColumnSuccess)
                break;
        }

        var isLeftDiagonalSuccess = false;
        for (let j = 0; j < 9; j += 4) {
            if (this.gameField[j] == type)
                isLeftDiagonalSuccess = true;
            else {
                isLeftDiagonalSuccess = false;
                break;
            }
        }

        var isRightDiagonalSuccess = false;
        for (let j = 0; j < 9; j += 2) {
            if (this.gameField[j] == type)
                isRightDiagonalSuccess = true;
            else {
                isRightDiagonalSuccess = false;
                break;
            }
        }

        var success = isRowSuccess || isColumnSuccess || isRightDiagonalSuccess || isLeftDiagonalSuccess;
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
