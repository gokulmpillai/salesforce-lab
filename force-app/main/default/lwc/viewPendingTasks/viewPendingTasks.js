import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import messageChannel from '@salesforce/messageChannel/toDoList__c';
import Id from "@salesforce/user/Id";
import getCurrentUserNotes from '@salesforce/apex/NotesController.getCurrentUserNotes';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ViewPendingTasks extends LightningElement {
    data=[];
    showData = false;
    error;
    @wire(MessageContext)
    messageContext;

    getCurrentNotes(){
        getCurrentUserNotes({userId : Id})
        .then(result => {
            result.forEach(element => {
                this.data = [...this.data, {Id: element.Id, description: element.Description__c}];
            });
        }).then(()=>{
            this.showData = this.data.length > 0;
        }
        )
        .catch(error =>{
            this.error = error.message;
        })
    }

    connectedCallback(){
        this.getCurrentNotes();
        console.log('Inside connectedCallback!!!');
        subscribe(this.messageContext, messageChannel, element => {
            console.log('Subscribed!!!'+ element);
            this.handleMessage(element);
        })
    }

    handleMessage(message) {
        if (message) {
            this.data = [...this.data, {Id: message.createdRecordId, description: message.messageToSend}];
            console.log('Newly created Task: ',this.data);
            this.showData = true;
            console.log('DATA:', this.data);
        }
    }

    taskCompleteHandler(event){
        const recordId = event.target.dataset.id;
        deleteRecord(recordId).then(()=>{
            this.data = this.data.filter(task => task.Id !== recordId);
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Note is deleted successfully',
                variant: 'success'
            }))
            this.showData = this.data.length > 0;
        })
        .catch(error => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: error.body.message,
                variant: 'error'
            }))
        })
    }
}