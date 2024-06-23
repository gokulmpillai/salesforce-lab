import { LightningElement } from 'lwc';

export default class GrandParentComponent extends LightningElement {

    parentMessage;
    childMessage;

    messageFromParent(event){
        this.parentMessage = event.detail.message;
    }

    messageFromChild(event){
        this.childMessage = event.detail.message;
    }
}