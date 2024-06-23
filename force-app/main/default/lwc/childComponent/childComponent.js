import { LightningElement } from 'lwc';

export default class ChildComponent extends LightningElement {

    message;

    onclickHandler(event){
        this.dispatchEvent(new CustomEvent('sendmessage', { 
            bubbles :true, 
            composed: true, 
            detail :{
            message : 'Hello from Child Component!',
        }}));
    }

}