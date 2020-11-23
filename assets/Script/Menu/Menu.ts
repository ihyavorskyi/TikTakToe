const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    battleWithAnotherPlayerButton: cc.Button = null;

    onLoad() {
        this.battleWithAnotherPlayerButton.node.on('click', this.battleWithAnotherPlayer, this);
    }

    battleWithAnotherPlayer() {
        cc.director.loadScene("Game");
    }
}