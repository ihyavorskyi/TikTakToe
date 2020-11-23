const { ccclass, property } = cc._decorator;

@ccclass
export default class Finish extends cc.Component {

    static winId = 0;

    @property(cc.SpriteFrame)
    winX: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    winO: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    winNon: cc.SpriteFrame = null;

    @property(cc.Button)
    buttonMenu: cc.Button = null;

    onLoad() {
        this.buttonMenu.node.on('click', this.buttonCallback, this);
        this.getWinMessage(Finish.winId);
    }

    buttonCallback(level: number,button: cc.Button) {
        cc.director.loadScene("Menu");
    }

    getWinMessage(winId: number){

        let node = new cc.Node("WinMessage");
        var sprite = node.addComponent(cc.Sprite);

        if(winId == 1){
            sprite.spriteFrame = this.winX;
        }else if(winId == 10){
            sprite.spriteFrame = this.winO;
        }
        else if(winId == -1){
            sprite.spriteFrame = this.winNon;
        }
        
        node.setScale(0.5);
        node.setPosition(0, 200);
        this.node.addChild(node);
    }
}