import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class customRepeaterComponent extends NavigationMixin(LightningElement) {

    count = 0;
    
    @track elements = [{
                         'id' : 0,
                        }];


    addHandler(){
        ++this.count;
        var accessKey = {
            'id' : this.count,
        };
        this.elements = [...this.elements, accessKey];
        console.log(JSON.stringify(this.elements));
    }   
    
    deleteHandler(event){
        const currentId = parseInt(event.target.dataset.id, 10);
        if(this.elements.length >=2){
            this.elements = this.elements.filter(element => {
                return parseInt(element.id) !== currentId;
            })
        }
    }

    submitHandler(){
        var isVal=true;
        this.template.querySelectorAll('lightning-input-field').forEach((element) => {isVal = isVal && element.reportValidity()});

        if(isVal){
            this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
                element.submit();
            })
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contacts successfully created',
                    variant: 'success',
                }),
            );

            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'Contact',
                    actionName: 'home',
                },
            });
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: 'Please enter all the required fields',
                    variant: 'error',
                }),
            );
        }
    }
}