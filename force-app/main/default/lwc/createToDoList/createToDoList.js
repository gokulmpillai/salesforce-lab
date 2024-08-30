import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import messageChannel from '@salesforce/messageChannel/toDoList__c';
import NOTE_OBJECT from '@salesforce/schema/Note__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Note__c.Description__c';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateToDoList extends LightningElement {

    data;
    createdRecordId;

    @wire(MessageContext)
    messageContext; 

    toDoInputHandler(event){
        this.data = event.target.value;
        // console.log(this.data);
    }

    createToDoHandler(){
        console.log('To Do Handler');
        const fields = {};
        fields[DESCRIPTION_FIELD.fieldApiName] = this.data;
        const recordInput = {"apiName": NOTE_OBJECT.objectApiName, fields};
        let inputElement = this.template.querySelector('lightning-input');
        console.log('Input Element' +inputElement);

        if(this.data && this.data.trim() != ''){
            inputElement.setCustomValidity('');
            inputElement.reportValidity();
            createRecord(recordInput)
            .then((result) => {
                this.createdRecordId = result.id;
                console.log('Create Record Result: '+ JSON.stringify(result.id));
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Sucess',
                    message: 'Note was created successfully!!!',
                    variant: 'success',
                }))
            }).then(() => {
                let payload = {
                    messageToSend: this.data,
                    createdRecordId: this.createdRecordId,
                }
                console.log('Payload: '+ JSON.stringify(payload));
                publish(this.messageContext, messageChannel, payload);
            })
            .catch((error)=>{
                console.log('Record creation error: ' + error.body.message);
            })
        }
        else{
            inputElement.setCustomValidity('Please enter a note');
            inputElement.reportValidity();
        }
    }
}