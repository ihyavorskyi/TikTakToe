const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMain extends cc.Component {

    @property(cc.Button)
    button1: cc.Button = null;

    @property(cc.Button)
    button2: cc.Button = null;

    @property(cc.Button)
    button3: cc.Button = null;

    @property(cc.Button)
    button4: cc.Button = null;

    @property(cc.Button)
    button5: cc.Button = null;

    @property(cc.Button)
    button6: cc.Button = null;

    @property(cc.Button)
    button7: cc.Button = null;

    @property(cc.Button)
    button8: cc.Button = null;

    @property(cc.Button)
    button9: cc.Button = null;


    @property(cc.Label)
    label1: cc.Label = null;

    @property(cc.Label)
    label2: cc.Label = null;

    @property(cc.Label)
    label3: cc.Label = null;

    @property(cc.Label)
    label4: cc.Label = null;

    @property(cc.Label)
    label5: cc.Label = null;

    @property(cc.Label)
    label6: cc.Label = null;

    @property(cc.Label)
    label7: cc.Label = null;

    @property(cc.Label)
    label8: cc.Label = null;

    @property(cc.Label)
    label9: cc.Label = null;


    onLoad() {
        this.button1.node.on('click', () => {
            this.label1.string = "X";
            this.buttonCallback(1, this.button1)
        }, this);
        this.button2.node.on('click', () => {
            this.label2.string = "X";
            this.buttonCallback(1, this.button2)
        }, this);
        this.button3.node.on('click', () => {
            this.label3.string = "X";
            this.buttonCallback(1, this.button3)
        }, this);
        this.button4.node.on('click', () => {
            this.label4.string = "X";
            this.buttonCallback(1, this.button4)
        }, this);
        this.button5.node.on('click', () => {
            this.label5.string = "X";
            this.buttonCallback(1, this.button5)
        }, this);
        this.button6.node.on('click', () => {
            this.label6.string = "X";
            this.buttonCallback(1, this.button6)
        }, this);
        this.button7.node.on('click', () => {
            this.label7.string = "X";
            this.buttonCallback(1, this.button7)
        }, this);
        this.button8.node.on('click', () => {
            this.label8.string = "X";
            this.buttonCallback(1, this.button8)
        }, this);
        this.button9.node.on('click', () => {
            this.label9.string = "X";
            this.buttonCallback(1, this.button9)
        }, this);
    }

    buttonCallback(id: number, button: cc.Button) {
        button.enabled = false;
    }
}