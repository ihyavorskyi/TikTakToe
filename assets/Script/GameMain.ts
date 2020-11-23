import GameFacade from "./GameFacade";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMain extends cc.Component {

    game: GameFacade;

    buttonArray: cc.Button[] = [];
    labelArray: cc.Label[] = [];

    onLoad() {

        this.loadButtons();

        for (let i = 0, j = 1; i < this.buttonArray.length; i++, j++) {
            this.buttonArray[i].node.on('click', () => {
                this.buttonCallback(j, this.buttonArray[i], this.labelArray[i])
            }, this);
        }
        this.game = new GameFacade;
    }

    buttonCallback(id: number, button: cc.Button, label: cc.Label) {
        var player = this.game.GoStep(id);
        player == 1 ? label.string = "X" : label.string = "O";

        button.enabled = false;

        let isWin = this.game.CheckWin();
        console.log(isWin);
        
        isWin == 1 ? console.log('X WIN') : isWin == 2 ? console.log('O WIN')
            : console.log('not win yet....');
    }


    loadButtons() {
        for (let i = 1; i < 10; i++) {

            let button = cc.find(`Canvas/Button${i}`).getComponent(cc.Button);
            this.buttonArray.push(button);

            let label = cc.find(`Canvas/Button${i}/Background/Label${i}`).getComponent(cc.Label);
            this.labelArray.push(label);
        }
    }
}