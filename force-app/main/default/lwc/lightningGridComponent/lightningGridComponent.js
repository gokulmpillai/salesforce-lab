import { LightningElement, track } from 'lwc';
import getAccountWithRelatedContacts from '@salesforce/apex/GridController.getAccountWithRelatedContacts';

export default class LightningGridComponent extends LightningElement {

    // accounts;
    data;
    error;

    connectedCallback(){
        this.getAccountWithRelatedContacts();
    }

    @track columns= [{label : 'Name', fieldName : 'Name'},
                      {label : 'First Name', fieldName : 'FirstName'},
                      {label : 'Last Name', fieldName : 'LastName'},
                      {label : 'Email', fieldName : 'Email'}
                    ];
    
    getAccountWithRelatedContacts() {
        getAccountWithRelatedContacts()
            .then(result => {
                const accounts = JSON.parse(JSON.stringify(result));
                console.log(accounts);
                for(var i =0; i< accounts.length; i++){
                    var relatedContacts = accounts[i]['Contacts'];
                    if(relatedContacts){
                        accounts[i]._children = relatedContacts;
                        delete accounts[i].Contacts;
                    }
                }
                this.data = accounts;
            })
            .catch(error => {
                this.error = error.body.message;
                console.log('*******Error****** ' + this.error);
            });
    }
}