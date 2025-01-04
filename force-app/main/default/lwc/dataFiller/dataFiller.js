import { LightningElement, wire } from 'lwc';
import dataFillerChannel from '@salesforce/messageChannel/dataFiller__c';
import { publish, MessageContext } from 'lightning/messageService';

export default class DataFiller extends LightningElement {

    name='';
    phone='';
    email='';
    data={};

    @wire(MessageContext)
    messageContext;

    handleInput(event){
        const field = event.target.dataset.field;
        if(field){
            this.data[field] = event.target.value;
            console.log(this.name);
            console.log(this.phone);
            console.log(this.email);
        }
        console.log('***********Data**************: '+ JSON.stringify(this.data));
    }

    handleClick(event){
        let payload = this.data;
        let isValid = true;
            let checkInputValues = this.template.querySelectorAll('lightning-input');
            checkInputValues.forEach((result) => {
                if(!result.value){
                    isValid = false;
                    result.setCustomValidity('This detail is required');
                    result.reportValidity();
                }
                else{
                    result.setCustomValidity('');
                }
            }) 

            if(isValid){
                publish(this.messageContext, dataFillerChannel, { ...this.data });
                console.log('Published Data:', JSON.stringify(this.data));
            }
    }

    handleClear(event){
        let inputValues = this.template.querySelectorAll('lightning-input');
        inputValues.forEach((result) => {
            result.value = '';
            result.setCustomValidity('');
        });
        this.data={}
        console.log('Cleared Data:', JSON.stringify(this.data));
    }
}