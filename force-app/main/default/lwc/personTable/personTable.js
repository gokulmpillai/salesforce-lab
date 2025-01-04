import { LightningElement, wire } from 'lwc';
import dataFillerChannel from '@salesforce/messageChannel/dataFiller__c';
import {subscribe, MessageContext } from 'lightning/messageService';

export default class PersonTable extends LightningElement {

    @wire(MessageContext)
    messageContext;
    data=[];

    connectedCallback(){
        subscribe(this.messageContext, dataFillerChannel, (result)=>{
            this.data=[...this.data, result];
            console.log('this.data' + JSON.stringify(this.data));
        })
    }

    columns=[{label:'Name', fieldName:'name'},
             {label:'Phone', fieldName:'phone'},
             {label:'Email', fieldName:'email'}
            ];
} 