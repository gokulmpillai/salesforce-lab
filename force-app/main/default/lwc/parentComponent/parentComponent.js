import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    
    customMessage;

    messageFromChild(event){
        this.customMessage = event.detail.message;
        console.log(this.customMessage);
    }
}