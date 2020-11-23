import GameMain from "../GameMain";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    battleWithAnotherPlayerButton: cc.Button = null;

    buttonArray: cc.Button[] = [];

    onLoad() {

        let button = cc.find("Menu/BattleWithAnotherPlayer").getComponent(cc.Button);
        this.buttonArray.push(button);

        button = cc.find("Menu/LowAI").getComponent(cc.Button);
        this.buttonArray.push(button);

        button = cc.find("Menu/MidleAI").getComponent(cc.Button);
        this.buttonArray.push(button);

        button = cc.find("Menu/HighAI").getComponent(cc.Button);
        this.buttonArray.push(button);

        for (let i = 0, j = 1; i < this.buttonArray.length; i++, j++) {
            this.buttonArray[i].node.on('click', () => {
                this.buttonCallback(j, this.buttonArray[i])
            }, this);
        }
    }

    buttonCallback(level: number,button: cc.Button) {
        GameMain.Level = level;
        cc.director.loadScene("Game");
    }
}