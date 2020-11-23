import Finish from "./Finish";
import GameFacade from "./GameFacade";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMain extends cc.Component {

    static Level = 0;
    level: number;


    @property(cc.SpriteFrame)
    buttonDisabledFrameX: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    buttonDisabledFrameO: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    buttonDisabledFRedFrame: cc.SpriteFrame = null;

    @property(cc.Button)
    buttonMenu: cc.Button = null;

    game: GameFacade;

    buttonArray: cc.Button[] = [];
    labelArray: cc.Label[] = [];

    onLoad() {

        this.level = GameMain.Level;
        this.loadButtons();

        for (let i = 0, j = 1; i < this.buttonArray.length; i++, j++) {
            this.buttonArray[i].node.on('click', () => {
                this.buttonCallback(j, this.buttonArray[i], this.labelArray[i])
            }, this);
        }

        this.buttonMenu.node.on('click', this.buttonMenuCallback, this);

        this.game = new GameFacade;
    }

    buttonCallback(id: number, button: cc.Button, label: cc.Label) {
        if (this.level == 1) {
            this.buttonCallback_Human(id, button, label);
        } else {
            this.buttonCallback_AI(id, button, label);
        }
    }

    buttonCallback_Human(id: number, button: cc.Button, label: cc.Label) {
        var player = this.game.GoStep(id);
        player == 1 ? label.string = "X" : label.string = "O";

        button.enabled = false;
        player == 1 ?
            button.normalSprite = this.buttonDisabledFrameX :
            button.normalSprite = this.buttonDisabledFrameO;

        let isWin = this.game.CheckWin();
        console.log(isWin);

        setTimeout(() => {

            if (isWin == 1) {

                Finish.winId = isWin;
                cc.director.loadScene("Finish")
            } else if (isWin == 10) {
                Finish.winId = isWin;
                cc.director.loadScene("Finish")
            }
        }, 1000)

    }

    buttonCallback_AI(id: number, button: cc.Button, label: cc.Label) {
        var last = 0;
        switch (this.level) {
            case 2:
                last = this.game.GoStepWithAI_Low(id);
                break;
            case 3:
                last = this.game.GoStepWithAI_Middle(id);
                break;
            case 4:
                last = this.game.GoStepWithAI_Hard(id);
                break;

        }
        label.string = "X";

        button.enabled = false;
        button.normalSprite = this.buttonDisabledFrameX;

        this.buttonArray[last].enabled = false;
        this.buttonArray[last].normalSprite = this.buttonDisabledFrameO;
        this.labelArray[last].string = 'O';

        let isWin = this.game.CheckWin();

        console.log(isWin);

        setTimeout(() => {

            if (isWin == 1) {

                Finish.winId = isWin;
                cc.director.loadScene("Finish")
            } else if (isWin == 10) {
                Finish.winId = isWin;
                cc.director.loadScene("Finish")
            }
        }, 1000)
    }

    buttonMenuCallback() {
        cc.director.loadScene("Menu");
    }

    disableButtons() {
        this.buttonArray.forEach(element => {
            element.enabled = false;
        });
    }


    loadButtons() {

        for (let i = 1; i < 10; i++) {

            let button = cc.find(`Canvas/Button${i}`).getComponent(cc.Button);
            this.buttonArray.push(button);

            let labelNode = cc.find(`Canvas/Button${i}/Background/Label${i}`);
            labelNode.height = 100;
            let label = labelNode.getComponent(cc.Label);
            label.fontSize = 60;

            this.labelArray.push(label);
        }
    }
}