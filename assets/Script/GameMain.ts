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
            this.buttonCallback(1, this.button1, this.label1)
        }, this);
        this.button2.node.on('click', () => {
            this.buttonCallback(2, this.button2, this.label2)
        }, this);
        this.button3.node.on('click', () => {
            this.buttonCallback(3, this.button3, this.label3)
        }, this);
        this.button4.node.on('click', () => {
            this.buttonCallback(4, this.button4, this.label4)
        }, this);
        this.button5.node.on('click', () => {
            this.buttonCallback(5, this.button5, this.label5)
        }, this);
        this.button6.node.on('click', () => {
            this.buttonCallback(6, this.button6, this.label6)
        }, this);
        this.button7.node.on('click', () => {
            this.buttonCallback(7, this.button7, this.label7)
        }, this);
        this.button8.node.on('click', () => {
            this.buttonCallback(8, this.button8, this.label8)
        }, this);
        this.button9.node.on('click', () => {
            this.buttonCallback(9, this.button9, this.label9)
        }, this);
    }

    buttonCallback(id: number, button: cc.Button, label: cc.Label) {
        label.string = "X";
        console.log(id);
        button.enabled = false;
    }
}