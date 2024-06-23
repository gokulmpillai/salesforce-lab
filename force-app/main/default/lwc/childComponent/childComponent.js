import { LightningElement } from 'lwc';

export default class ChildComponent extends LightningElement {

    message;

    onclickHandler(event){
        this.dispatchEvent(new CustomEvent('sendmessage', { detail :{
            message : 'Hello from Child Component!'
        }}), {bubbles :true, composed : true});
    }

}