import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    
    customMessage;

    messageFromChild(event){
        this.customMessage = event.detail.message;
        console.log(this.customMessage);
    }

    messageToGrandParent(){
        this.dispatchEvent( new CustomEvent('parentevent', { 
            bubbles : true, 
            composed : true, 
            detail: {
                message: 'This is a message from Parent to Grandparent',
            }
        }));
        // this.dispatchEvent(customEvent);
    }
}