const { ccclass, property } = cc._decorator;

@ccclass
export default class Finish extends cc.Component {

    static winId = 0;

    @property(cc.SpriteFrame)
    winX: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    winO: cc.SpriteFrame = null;

    onLoad() {
        this.getWinMessage(Finish.winId);
    }

    getWinMessage(winId: number){

        let node = new cc.Node("WinMessage");
        var sprite = node.addComponent(cc.Sprite);

        if(winId == 1){
            sprite.spriteFrame = this.winX;
        }else if(winId == 2){
            sprite.spriteFrame = this.winO;
        }
        
        node.setPosition(0, 0);
        this.node.addChild(node);
    }
}